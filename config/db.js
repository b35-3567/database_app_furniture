 
const mongoose = require('mongoose');
//const Books=require('../model/Books')
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/THI_API", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connect success');
    //tạo một model thú cưng trên monogoDB
//const petDummy=await Books.create({});
//console.log(petDummy);
  } catch (error) {
    console.error('Connect fail:', error);
  }
};

module.exports = connectDB;
 
/*
const mongoose = require('mongoose');
const ThuCung = require('../model/ThuCung');  // Đường dẫn tương đối tới model ThuCung của bạn

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/THI_API", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connect success');

    // Tạo một thú cưng dummy và lưu nó để tạo collection
    const petDummy = new ThuCung({ name: 'Dummy Pet' }); // Bạn cần cung cấp ít nhất các trường bắt buộc
    const doc = await petDummy.save(); // Lưu thú cưng dummy vào database
    console.log('Dummy pet added:', doc);

    // Nếu muốn, bạn có thể xóa ngay sau khi kiểm tra
    // await ThuCung.deleteOne({ _id: doc._id });

  } catch (error) {
    console.error('Connect fail:', error);
  }
};

module.exports = connectDB;
*/