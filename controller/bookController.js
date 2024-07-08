const Books = require('../model/Books');

// Hàm tìm kiếm sách theo tiêu đề
async function searchBooksByTitle(from,to) {
    try {

        // Lấy tất cả sách từ cơ sở dữ liệu
        const allBooks = await Books.find(
        
        );
        
        // Lọc sách có tiêu đề chứa từ khóa
        const filteredBooks = allBooks.filter(book => book.pageNumber >=from && to<=book.pageNumber);
 

      return filteredBooks;
    } catch (error) {
        throw new Error(error.message);
    }
}
// Hàm lấy danh sách sách
async function getAllBooks() {
    try {
        // Lấy tất cả sách từ cơ sở dữ liệu
        const books = await Books.find();
        return books;
    } catch (error) {
        throw new Error(error.message);
    }
}
//hàm cập nhật
async function updateBook(id, newPageNumber) {
    try {
        // Cập nhật thông tin sách và trả về đối tượng sau khi cập nhật
        const updatedBook = await Books.findOneAndUpdate(
            { _id: id },
            { pageNumber: newPageNumber }
        );
  
        // Nếu không tìm thấy thú cưng, trả về thông báo lỗi
        if (!updatedBook) {
            return { message: 'Không tìm thấy sách' };
        }
  
        // Trả về thông báo cập nhật thành công cùng với thông tin thú cưng
        return { message: 'Cập nhật không thành công', data: updatedBook };
    } catch (error) {
        // Trả về thông báo lỗi nếu có lỗi xảy ra
        return { message: 'Đã xảy ra lỗi', error: error.message };
    }
  }
module.exports = { searchBooksByTitle,getAllBooks,updateBook}
