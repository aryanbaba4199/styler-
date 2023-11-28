
import { MongoClient } from 'mongodb'

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const uri = process.env.MONGODB_URI
const options = {}

let client
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === 'development') {
 
  if (!(<any>global)._mongoClientPromise) {
    client = new MongoClient(uri, options);
    (<any>global)._mongoClientPromise = client.connect()
  }
  clientPromise = (<any>global)._mongoClientPromise
  console.log(process.env.MONGODB_URI)
} else {
  
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
  console.log(process.env.MONGODB_URI)
}


export default clientPromise;