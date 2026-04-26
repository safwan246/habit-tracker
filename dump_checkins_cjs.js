const mongoose = require('mongoose');

const CheckInSchema = new mongoose.Schema({}, { strict: false });
const CheckIn = mongoose.models.CheckIn || mongoose.model('CheckIn', CheckInSchema, 'checkins');

async function run() {
  await mongoose.connect("mongodb+srv://safuwan:safwan1234@cluster0.lqm6ryb.mongodb.net/habitTracker");
  const data = await CheckIn.find({});
  console.log(JSON.stringify(data, null, 2));
  process.exit(0);
}

run().catch(console.dir);
