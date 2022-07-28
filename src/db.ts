import { Pool } from 'pg';

const connectionString = '';

const DB = new Pool({ connectionString });

export default DB;
