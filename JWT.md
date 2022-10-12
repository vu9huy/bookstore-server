## authen
### /login
- client gửi username & password plain text lên server qua api /login. 
- server check logic, gen 2 token: access_token & refresh_token trả về client.

 > access_token để gửi kèm header với key là `Authorization` trong mỗi api. Expire 30 phút -> 1 giờ. refresh_token dùng để lấy access_token mới.
 

### /refresh-token
- Với bất kỳ api nào client nhận được mã lỗi `403` thì có thể do access_token đã expired. Do đó cần request access_token mới.
- gửi refresh_token đã trả về ở login
- nếu đúng thì verifyJWT (refresh_token)  và generate ra cặp access_token và refresh_token mới trả về client.
-   Nếu client nhận đc status code 401 bắn ra màn login.

### Lưu ý
* Vì ở dưới client có thể gọi multiple request cùng 1 thời điểm. Do đó khi có lỗi `403` bắn về, client cần  xử lý multiple request  giống như 1 interceptor.
* Tham khảo đoạn code này: https://gist.github.com/paulnguyen-mn/8a5996df9b082c69f41bc9c5a8653533