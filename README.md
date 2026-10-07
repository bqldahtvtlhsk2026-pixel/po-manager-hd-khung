# PO Manager HĐ khung – P.QLHT · BQLDAHTVT

Web quản lý đăng ký, phê duyệt P/O và hạn mức theo từng HĐ khung (LHSK, Nhà trạm, Truyền dẫn, GPON) và từng năm.

- Giao diện: `index.html`, `app.js`, `style.css`, `banner.jpg` (web tĩnh, deploy Vercel).
- Kết nối CSDL: `config.js` (Supabase project "PO Dang Ky - BQLDAHTVT"). Khóa trong file là khóa publishable, chỉ gọi được các hàm có kiểm tra phiên đăng nhập.
- CSDL: `supabase/01_schema.sql` (bảng, nhật ký), `supabase/02_api.sql` (hàm đăng nhập, PO, hạn mức, gửi mail).
- Email tự động: `email-apps-script/` – dán vào Google Apps Script dưới tài khoản gửi thông báo, khai báo Script Property `MAILER_KEY` (lấy trong bảng `cau_hinh`), chạy hàm `caiDat`.

Tài khoản: `PQLHT` (quản trị, tự đặt mật khẩu ở lần đăng nhập đầu); 34 tỉnh đăng nhập bằng mã tỉnh (HNI, HCM…), mật khẩu do P.QLHT cấp ở mục "Tài khoản & tỉnh".
