# Nghiên cứu Chú giải Kinh Thánh Giáo Phụ (Patristic Exegesis Reader)

Một ứng dụng web đọc và nghiên cứu học thuật chuyên sâu về chủ đề **"Phương Pháp Chú Giải Kinh Thánh Của Các Giáo Phụ: Nền Tảng Thần Học, Cấu Trúc Thông Diễn Học Và Di Sản Lịch Sử"**. 

Dự án được xây dựng tập trung tối ưu hóa trải nghiệm đọc, giao diện tương tác cao cấp mang tính phụng vụ học thuật Công giáo và hiệu năng tối ưu trên mọi kích thước màn hình.

---

## 🛠️ Công nghệ Sử dụng (Tech Stack)

*   **Framework**: Next.js 15 (App Router, Server-side Rendering & Static Generation).
*   **Giao diện & Styling**: Tailwind CSS (chế độ tùy biến sâu qua CSS Variables động) kết hợp Vanilla CSS (`globals.css`).
*   **Xử lý nội dung**: `react-markdown` kết hợp plugin `remark-gfm` (hỗ trợ bảng biểu học thuật phức tạp).
*   **Icons**: Lucide React.
*   **Ngôn ngữ**: TypeScript & JavaScript.

---

## 🎨 Triết lý Thiết kế (Design Aesthetics)

Ứng dụng hướng tới trải nghiệm đọc cao cấp mang phong cách học thuật và phụng vụ cổ điển:
1.  **Hệ màu học thuật (Academic Color Palette)**:
    *   **Light (Sáng)**: Màu kem sữa thánh hiến (`#FDFBF7`) làm dịu mắt, kết hợp màu đỏ rượu nho phụng vụ (`#7B2D3B`) và viền vàng kim sách lễ (`#B8860B`).
    *   **Sepia (Hoài cổ)**: Màu giấy da da cổ kính (`#F4ECD8`) kết hợp tông chữ nâu ấm áp.
    *   **Dark (Tối)**: Giao diện nền đen than đá sang trọng (`#1A1A1A`), chữ màu xám sáng bảo vệ mắt và các chi tiết tương phản màu vàng cát vàng mịn (`#D4A373`).
2.  **Kiến trúc Chữ (Typography)**: Tối ưu hiển thị tiếng Việt học thuật bằng cách kết hợp ba phông chữ từ Google Fonts:
    *   **Source Serif 4**: Dành cho nội dung bài đọc chính (chữ có chân, tỉ lệ ký tự hoàn hảo).
    *   **Spectral**: Dành cho các tiêu đề chính và phụ (mang phong cách cổ điển Kinh Thánh).
    *   **Inter**: Dành cho giao diện người dùng, mục lục và các bảng menu.
3.  **Drop Cap (Chữ khởi đầu cổ điển)**: Áp dụng chữ cái đầu đoạn văn được phóng to và đổ bóng theo phong cách bản chép tay cổ thế kỷ (Illuminated Manuscript), được kiểm soát tối ưu qua CSS để loại bỏ hoàn toàn lỗi bất đồng bộ SSR (Hydration Mismatch).
4.  **Tối ưu hóa bản in (Print Stylesheet)**: Hỗ trợ tự động ẩn các thành phần điều hướng dư thừa, chuyển đổi màu sắc văn bản về đen trắng sắc nét và sắp xếp dàn trang gọn gàng khi người dùng nhấn `Ctrl + P`.

---

## 🌟 Các Tính năng Tương tác Nổi bật

### 1. Menu Tùy chỉnh Đọc (`ReadingSettings.tsx`)
*   **Đổi 3 chế độ màu**: Chuyển đổi mượt mà giữa chế độ Sáng, Sepia và Tối.
*   **Tăng giảm cỡ chữ**: Cho phép tinh chỉnh cỡ chữ linh hoạt từ `14px` đến `24px` (lưu tự động vào `localStorage`).
*   **Khắc phục lỗi chớp sáng (Anti-Flash)**: Sử dụng kịch bản chặn trước (blocking script) chèn trong thẻ `<head>` để tải đúng cài đặt theme ngay từ mili-giây đầu tiên, ngăn chặn hoàn toàn việc nhấp nháy sáng-tối khi F5 lại trang.

### 2. Mục lục Định hướng bên Trái (`TableOfContents.tsx`)
*   **Theo dõi phần đọc trực quan**: Tự động tô sáng phần mục lục đang hiển thị trên màn hình bằng thuật toán giám sát cuộn trang `IntersectionObserver`.
*   **Tích hợp đánh số tự động**: Tách biệt logic hiển thị số và tiêu đề để tối ưu hóa tính học thuật.
*   **Mục lục rút gọn bên Trái cho Di động**: Tích hợp ngăn kéo di động trượt mượt mà từ góc trái màn hình, hỗ trợ tắt khi chạm vào vùng ngoài (Overlay).

### 3. Tooltip Chú thích Linh hoạt (`FootnoteTooltip.tsx`)
*   **Trích xuất chú thích tự động**: Phân tích cú pháp mục nguồn trích dẫn cuối trang và chuyển đổi các số chú thích nhỏ thành các tooltip tương tác khi rê chuột (hover) hoặc chạm (click) trực tiếp.
*   **Tương thích di động**: Tự động co giãn theo tỷ lệ màn hình (`w-[85vw]`), loại bỏ hoàn toàn việc tràn khung hình trên điện thoại nhỏ.

### 4. Cụm nút Chia sẻ Đa phương tiện (`ShareButtons.tsx`)
*   **Nút Copy Link**: Sao chép nhanh liên kết bài đọc vào khay nhớ tạm cùng hiệu ứng thông báo "Đã chép link!" đẹp mắt đổi màu theo từng chủ đề.
*   **Tích hợp Web Share API**: Tự động kích hoạt tính năng chia sẻ hệ thống gốc của điện thoại trên các trình duyệt di động hỗ trợ (Safari/Chrome Mobile).
*   **Chia sẻ mạng xã hội**: Liên kết nhanh mở hộp thoại chia sẻ Facebook và X (Twitter).

---

## 📂 Cơ cấu Thư mục Chính

```
giao-phu-exegesis/
├── GiaoPhu.md               # Nội dung bài đọc nghiên cứu chính (Markdown chuẩn Công giáo)
├── tailwind.config.js       # Cấu hình Tailwind map CSS variables động và Prose typography
├── README.md                # Tài liệu hướng dẫn sử dụng dự án
├── src/
│   ├── app/
│   │   ├── globals.css      # Tập tin styles định nghĩa CSS variables và hiệu ứng
│   │   ├── layout.tsx       # Bố cục chính, thẻ head chống chớp sáng, nạp fonts
│   │   └── page.tsx         # Trang chủ chính (bài viết, header, sidebar mục lục)
│   ├── components/
│   │   ├── ArticleRenderer. # Trình dựng markdown sử dụng React-Markdown & Footnote parser
│   │   ├── TableOfContents. # Sidebar mục lục & ngăn kéo di động trái
│   │   ├── ReadingSettings. # Floating menu tùy chọn giao diện đọc và cỡ chữ
│   │   ├── ShareButtons.tsx # Cụm nút chia sẻ và copy liên kết (Client Component)
│   │   ├── FootnoteTooltip. # Tooltip chú thích thông minh tương thích mobile
│   │   ├── ReadingProgress. # Thanh tiến trình đọc tuyến tính ở đỉnh trang
│   │   └── ScrollToTop.tsx  # Nút cuộn nhanh lên đầu trang bài đọc
│   └── lib/
│       ├── content.ts       # Loader nạp nội dung bài viết từ GiaoPhu.md phía Server
│       └── utils.ts         # Tiện ích trích xuất mục lục, chú thích, tính thời gian đọc
```

---

## 🚀 Hướng dẫn Cài đặt & Chạy dưới Máy cục bộ

Yêu cầu máy tính cài đặt sẵn **Node.js (phiên bản 18 trở lên)**.

1.  **Cài đặt các gói thư viện phụ thuộc**:
    ```bash
    npm install
    ```

2.  **Khởi chạy máy chủ phát triển (Development Mode)**:
    ```bash
    npm run dev
    ```
    Mở trình duyệt truy cập: [http://localhost:3000](http://localhost:3000)

3.  **Biên dịch sản phẩm tối ưu (Production Build)**:
    ```bash
    npm run build
    ```
    Lệnh này dùng để kiểm tra tính toàn vẹn của mã nguồn, kiểu dữ liệu TypeScript và tạo ra các trang tĩnh tối ưu hóa tốc độ tải trang.

4.  **Chạy bản biên dịch thử nghiệm**:
    ```bash
    npm run start
    ```
