import 'reflect-metadata';
import { createConnection } from 'typeorm';
import ForeignKeyTarget from './entity/ForeignKeyTarget';
import WithRelationId from './entity/WithRelationId';
import NoRelationId from './entity/NoRelationId';
import program = require('commander');

async function main() {
  await createConnection({
    type: 'postgres',
    host: 'localhost',
    username: 'postgres',
    database: 'ormtest',
    entities: [WithRelationId, NoRelationId, ForeignKeyTarget],
    synchronize: true,
    dropSchema: true,
    logging: false
  });

  const useRelationId: boolean = program.relationId;
  const numRecords: number = program.numRecords;

  const target = new ForeignKeyTarget();
  await target.save();

  for (let i = 0; i < numRecords; i++) {
    const rec = useRelationId ? new WithRelationId() : new NoRelationId();
    rec.fkTarget = Promise.resolve(target);
    await rec.save();
  }

  const count = useRelationId ? await WithRelationId.count() : await NoRelationId.count();
  console.log(`Added ${count} records`);

  console.time('fetch');
  if (useRelationId) {
    await WithRelationId.find();
  } else {
    await NoRelationId.find();
  }
  console.timeEnd('fetch');
}

export function wrapErrors(fn: (...args: any[]) => Promise<void>) {
  return (...args: any[]) => {
    fn(...args)
      .then(() => process.exit(0))
      .catch(e => {
        console.error(e);
        process.exit(1);
      });
  };
}

const DEFAULT_NUM_RECS = 100;

program
  .option('-r, --relationId', `Use the Entity with the RelationId annotation`)
  .option('-n, --numRecords [numRecords]', `Insert this many records during the test`, DEFAULT_NUM_RECS)
  .action(wrapErrors(main))
  .parse(process.argv);
