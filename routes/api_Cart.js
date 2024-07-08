const express = require('express');
const router = express.Router();
const Cart = require('../model/Cart');
const Product = require('../model/Product');
const Account = require('../model/Account');

// Thêm sản phẩm vào giỏ hàng dựa trên email người dùng và ID của sản phẩm
router.post('/addtocart', async (req, res) => {
    try {
        const { email, productId, quantity } = req.body;

        // Kiểm tra xem người dùng có tồn tại không
        const account = await Account.findOne({ Email: email });
        if (!account) {
            return res.status(404).json({ message: 'Người dùng không tồn tại' });
        }

        // Kiểm tra xem sản phẩm có tồn tại không
        const product = await Product.findOne({ ProductID: productId });
        if (!product) {
            return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
        }

        // Tìm giỏ hàng của người dùng dựa trên email và productId
        let cartItem = await Cart.findOne({ Email: email, ProductID: productId });

        // Nếu giỏ hàng không tồn tại, tạo mới giỏ hàng
        if (!cartItem) {
            cartItem = new Cart({
                Email: email,
                ProductID: productId,
                Quantity: quantity
            });
        } else {
            // Nếu sản phẩm đã tồn tại, tăng số lượng sản phẩm lên
            cartItem.Quantity += quantity;
        }

        // Lưu giỏ hàng vào cơ sở dữ liệu
        await cartItem.save();
 // Truy xuất thông tin sản phẩm và tạo đối tượng để hiển thị
 const productInfo = await Product.findOne({ ProductID: productId });

        res.status(200).json({ message: 'Sản phẩm đã được thêm vào giỏ hàng của người dùng',
        cartItem:{
            Email: cartItem.Email,
            ProductID: cartItem.ProductID,
            Quantity: cartItem.Quantity,
            productInfo
        }
        
    });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Đã xảy ra lỗi khi thêm sản phẩm vào giỏ hàng' });
    }
});
router.get('/cartitems/:email', async (req, res) => {
    try {
        const { email } = req.params;

        // Tìm tất cả các mục trong giỏ hàng dựa trên email
        const cartItems = await Cart.find({ Email: email });

        // Nếu không tìm thấy mục nào trong giỏ hàng, trả về thông báo lỗi
        if (cartItems.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy mục nào trong giỏ hàng' });
        }

        // Truy xuất thông tin sản phẩm cho từng mục trong giỏ hàng
        const cartItemInfos = await Promise.all(cartItems.map(async (cartItem) => {
            const productInfo = await Product.findOne({ ProductID: cartItem.ProductID });
            return {
                _id: cartItem._id,
                Email: cartItem.Email,
                ProductID: cartItem.ProductID,
                Quantity: cartItem.Quantity,
                Product: productInfo
            };
        }));

        // Trả về thông tin của tất cả các mục trong giỏ hàng
        res.status(200).json(cartItemInfos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Đã xảy ra lỗi khi hiển thị thông tin của các mục trong giỏ hàng' });
    }
});

router.put('/plus_cart/:productId',async(req,res)=>{
   try {
      
     const {productId}=req.params;
     const cartItem=await Cart.findOne({ProductID:productId});
     if(!cartItem){
        res.status(400).json({message:'không tìm thấy id sản phẩm'});
     }
     if(cartItem.Quantity >=1){
          cartItem.Quantity+=1;
          //lưu thay đổi
          await cartItem.save();
          return res.status(200).json({message:'đã tăng số lượng',cartItem})
     }
     return res.status(500).json({message:'không thể tăng số lượng vì nhỏ hơn 1'})
   } catch (error) {
      console.error(error);
      res.status(500).json({message:'đã xảy ra lỗi khi tăng số lượng '})
   }

});
router.put('/subtract_cart/:productId',async (req,res)=>{
    try {
        const{productId}=req.params;
        const cartItem=await Cart.findOne({ProductID:productId});
        if(!cartItem){
            res.status(400).json({message:'không tìm thấy id của sản phẩm'});
        }
        if(cartItem.Quantity>=1){
            cartItem.Quantity-=1;
            await cartItem.save();
            return res.status(200).json({message:'đã giảm số lượng',cartItem})
        }
        return res.status(400).json({message:'số lượng không còn giảm được'})
    } catch (error) {
        console.error(error);
        res.status(400).json({message:'đã xảy ra lỗi trong quá trình giảm số lượng'})
    }
});
module.exports = router;
