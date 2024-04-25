import { connect, connection } from "mongoose";
export class DbMongo {
  constructor() {}
  connect(h: string, dbName: string, u?: string, pass?: string, p?: number) {
    // let connectionuri = `mongodb://${h}:${p}/${dbName}`;
    let connectionuri = `mongodb+srv://hamzaqurashii1:5s9bz5FLfTwjeXyd@cluster0.q4zcwy3.mongodb.net/chatApp?retryWrites=true`;
    if (u != undefined && pass != undefined) {
      //   connectionuri = `mongodb+srv://${u}:${pass}@${h}/${dbName}`;
    }
    connect(connectionuri);
  }
}
export const MonStatConnection = connection.readyState;
