const express = require('express');
const router = express.Router();
const { searchBooksByTitle,getAllBooks,updateBook } = require('../controller/bookController');

// Route POST để tìm kiếm sách theo tiêu đề
router.post('/searchByTitle', async (req, res) => {
    try {
        // Lấy từ khóa tìm kiếm từ request body
        const { from,to } = req.body;
       
        // Gọi hàm searchBooksByTitle để tìm kiếm sách theo tiêu đề
        const foundBooks = await searchBooksByTitle(from,to);

        // Trả về danh sách sách tìm được dưới dạng JSON
        res.status(200).json(foundBooks);
    } catch (error) {
        // Trả về thông báo lỗi nếu có lỗi xảy ra
        res.status(500).json({ message: 'Đã xảy ra lỗi', error: error.message });
    }
});

// Route GET để lấy danh sách sách
router.get('/getAllBooks', async (req, res) => {
    try {
        // Gọi hàm getAllBooks để lấy danh sách sách
        const books = await getAllBooks();

        // Trả về danh sách sách dưới dạng JSON
        res.status(200).json(books);
    } catch (error) {
        // Trả về thông báo lỗi nếu có lỗi xảy ra
        res.status(500).json({ message: 'Đã xảy ra lỗi', error: error.message });
    }
});
// Route PUT để cập nhật lương của bác sĩ
router.put('/update', async (req, res) => {
    try {
        const { id } = req.query; // Lấy giá trị ID từ query params
        const { pageNumber} = req.body; // Lấy giá trị lương mới từ request body
       
        // Gọi hàm updateDoctorSalary để cập nhật lương của bác sĩ
        const result = await updateBook(id, pageNumber);

        // Trả về kết quả cập nhật
        res.status(200).json(result);
    } catch (error) {
        // Trả về thông báo lỗi nếu có lỗi xảy ra
        res.status(500).json({ message: 'Đã xảy ra lỗi', error: error.message });
    }
});
module.exports = router;
