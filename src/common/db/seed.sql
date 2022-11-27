DROP DATABASE IF EXISTS examOnline;
GO

CREATE DATABASE examOnline;
GO

USE [examOnline]
GO

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'HocPhan')
      BEGIN
        create table HocPhan
        (
          id										int IDENTITY(1,1) not null
            CONSTRAINT PK__HocPhan PRIMARY KEY CLUSTERED,
          hocPhan								nvarchar(max) not null,
          maHocPhan                             nvarchar(max) not null,
        )
        insert into HocPhan(hocPhan, maHocPhan) values
          ( N'Phân tích thiết kế hướng đối tượng', 'PTTK_HDT' ),
          ( N'Công nghệ phần mềm', 'CNPM' ),
          ( N'Lập trình mạng', 'LTM' ),
          ( N'Lập trình Java', 'LTJAVA' ),
          ( N'Lập trình C++', 'LTC' ),
          ( N'Trí tuệ nhân tạo', 'TTNT' ),
          ( N'Tin học xây dựng', 'THXD' ),
          ( N'Công nghệ thực phẩm', 'CNTP' ),
          ( N'Hóa Dầu', 'HD' ),
          ( N'Phân tích thiết kế hệ thống', 'PTTK_HT' ),
          ( N'Pháp luật đại cương', 'PLDC' ),
          ( N'Kiểm thử phần mềm', 'KTPM' ),
          ( N'Xây dựng hạ tầng mạng', 'XDHTM' )
      END

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'NamHoc')
      BEGIN
        create table NamHoc
        (
          id										int IDENTITY(1,1) not null
            CONSTRAINT PK__NamHoc PRIMARY KEY CLUSTERED,
          namHoc								nvarchar(max) not null
        )
        insert into NamHoc(namHoc) values
          ( '2017-2018' ),
          ( '2018-2019' ),
          ( '2019-2020' ),
          ( '2020-2021' ),
          ( '2021-2022' ),
          ( '2022-2023' ),
          ( '2023-2024' )
      END    

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'CachThucGiamSat')
      BEGIN
        create table CachThucGiamSat
        (
          id										int IDENTITY(1,1) not null
            CONSTRAINT PK__CachThucGiamSat PRIMARY KEY CLUSTERED,
          cachGiamSat								nvarchar(max) not null
        )
        insert into CachThucGiamSat(cachGiamSat) values
          ( N'Giám thị giám sát' ),
          ( N'Hệ thống giám sát' )
      END          


IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'MucDoCauHoi')
      BEGIN
        create table MucDoCauHoi
        (
          id										int IDENTITY(1,1) not null
            CONSTRAINT PK__MucDoCauHoi PRIMARY KEY CLUSTERED,
          mucDo								nvarchar(max) not null
        )
        insert into MucDoCauHoi(mucDo) values
          ( N'Dễ' ),
          ( N'Trung bình' ),
          ( N'Khó' )
      END    


IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Khoa')
      BEGIN
        create table Khoa
        (
          id										int IDENTITY(1,1) not null
            CONSTRAINT PK__Khoa PRIMARY KEY CLUSTERED,
          khoa								nvarchar(max) not null
        )
        insert into Khoa(khoa) values
          ( N'CNTT' ),
          ( N'Điện tử viễn thông' ),
          ( N'Công nghệ thực phẩm' ),
          ( N'Điện' ),
          ( N'Cơ khí' ),
          ( N'Dầu khí' ),
          ( N'Hoá' )
      END       


IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'KhoaHoc')
      BEGIN
        create table KhoaHoc
        (
          id										int IDENTITY(1,1) not null
            CONSTRAINT PK__KhoaHoc PRIMARY KEY CLUSTERED,
          khoaHoc								nvarchar(max) not null
        )
        insert into KhoaHoc(khoaHoc) values
          ( N'2016-2020' ),
          ( N'20217-2021'),
          ( N'2018-2022' ),
          ( N'2019-2023' ),
          ( N'2020-2024' ),
          ( N'2021-2025' ),
          ( N'2022-2026' )
      END  


IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'VaiTro')
      BEGIN
        create table VaiTro
        (
          id										int IDENTITY(1,1) not null
            CONSTRAINT PK__VaiTro PRIMARY KEY CLUSTERED,
          vaiTro								nvarchar(max) not null
        )
        insert into VaiTro(vaiTro) values
          ( N'Sinh viên' ),
          ( N'Giảng viên' ),
          ( N'admin' )
      END  


IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'HocKy')
      BEGIN
        create table HocKy
        (
          id										int IDENTITY(1,1) not null
            CONSTRAINT PK__HocKy PRIMARY KEY CLUSTERED,
          hocKy								nvarchar(max) not null
        )
        insert into HocKy(hocKy) values
          ( N'Học kỳ 1' ),
          ( N'Học kỳ 2' )
      END    


IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Lop')
      BEGIN
        create table Lop
        (
          id										int IDENTITY(1,1) not null
            CONSTRAINT PK__Lop PRIMARY KEY CLUSTERED,
          lop								nvarchar(max) not null
        )
        insert into Lop(lop) values
          ( N'18T1' ),
          ( N'18T2' ),
          ( N'18DT1' ),
          ( N'18DT2' ),
          ( N'18E1' ),
          ( N'18E2' )
      END           


 IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'TaiKhoan')
      BEGIN
        create table TaiKhoan
        (
          id										int IDENTITY(1,1) not null
            CONSTRAINT PK__TaiKhoan PRIMARY KEY CLUSTERED,
          roleId						int not null
            CONSTRAINT FK_TaiKhoan_Role_roleId REFERENCES Vaitro(id),
        
          username							nvarchar(50) not null,
          password                          nvarchar(50) not null,

          validFrom								datetime2 GENERATED ALWAYS AS ROW START,
          validTo									datetime2 GENERATED ALWAYS AS ROW END,
          PERIOD FOR SYSTEM_TIME (validFrom, validTo)
        )
        insert into TaiKhoan(roleId, username, password) values
            ( 1, '102180054', '102180054'),
            ( 1, '102180055', '102180055'),
            ( 1, '102180056', '102180056'),
            ( 1, '102180057', '102180057'),
            ( 1, '102180058', '102180058'),
            ( 1, '102180059', '102180059'),
            ( 1, '102180060', '102180060'),
            ( 1, '102180061', '102180061'),
            ( 1, '102180062', '102180062'),
            ( 1, '102180063', '102180063'),
            ( 1, '102180064', '102180064'),
            ( 1, '102180065', '102180065'),
            ( 1, '102180066', '102180066'),
            ( 1, '102180067', '102180067'),
            ( 2, 'xuantra', 'xuantra' ),
            ( 2, 'khoabui', 'khoabui' ),
            ( 2, 'nhanly', 'nhanly' ),
            ( 2, 'minhhieu', 'minhhieu' ),
            ( 2, 'vandung', 'vandung' ),
            ( 2, 'ngamai', 'ngamai' ),
            ( 3, 'admin', 'admin' )
      END    


 IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'NguoiDung')
      BEGIN
        create table NguoiDung
        (
          id										int IDENTITY(1,1) not null
            CONSTRAINT PK__NguoiDung PRIMARY KEY CLUSTERED,
          taiKhoanId						int not null
            CONSTRAINT FK_NguoiDung_taikhoan_taiKhoanId REFERENCES TaiKhoan(id),
          lopId						int null
            CONSTRAINT FK_NguoiDung_lop_lopId REFERENCES Lop(id),
          khoaId						int not null
            CONSTRAINT FK_NguoiDung_khoa_khoaId REFERENCES Khoa(id),
        
          mssv                          nvarchar(50) not null, 
          hoTen							nvarchar(100) not null,
          gioiTinh                      bit not null,
          ngaySinh                      datetime2 not null,
          sdt                           varchar(10) null,
          email                         varchar(max) null,
          khoa                          varchar(max) null,

          validFrom								datetime2 GENERATED ALWAYS AS ROW START,
          validTo									datetime2 GENERATED ALWAYS AS ROW END,
          PERIOD FOR SYSTEM_TIME (validFrom, validTo)
        )
        insert into NguoiDung(taiKhoanId, lopId, khoaId, mssv, hoTen, gioiTinh, ngaySinh, sdt, email, khoa) values
            ( 1, 1, 1, '102180054', N'Nguyễn Mạnh Việt', 1, '26-May-2000', '0772978470', 'thidaihoc29012000@gmail.com', '2018-2022'),
            ( 2, 1, 1, '102180055', N'Trương Công Khoa', 1, '26-May-2000', '0772978470', 'thidaihoc29012000@gmail.com', '2018-2022'),
            ( 3, 1, 1, '102180056', N'Trần Tấn Trung', 1, '26-May-2000', '0772978470', 'thidaihoc29012000@gmail.com', '2018-2022'),
            ( 4, 1, 1, '102180057', N'Đặng Trung Nguyên', 1, '26-May-2000', '0772978470', 'thidaihoc29012000@gmail.com', '2018-2022'),
            ( 5, 1, 1, '102180058', N'Trần Văn Trí', 1, '26-May-2000', '0772978470', 'thidaihoc29012000@gmail.com', '2018-2022'),
            ( 6, 1, 1, '102180059', N'Đặng Xuân Minh Sơn', 1, '26-May-2000', '0772978470', 'thidaihoc29012000@gmail.com', '2018-2022'),
            ( 7, 1, 1, '102180060', N'Thái Tăng Lực', 1, '26-May-2000', '0772978470', 'thidaihoc29012000@gmail.com', '2018-2022'),
            ( 8, 1, 1, '102180061', N'Nguyễn Xuân Tuấn', 1, '26-May-2000', '0772978470', 'thidaihoc29012000@gmail.com', '2018-2022'),
            ( 9, 1, 1, '102180062', N'Nguyễn Anh Vũ', 1, '26-May-2000', '0772978470', 'thidaihoc29012000@gmail.com', '2018-2022'),
            ( 10, 1, 1, '102180063', N'Nguyễn Thanh Hoàng', 1, '26-May-2000', '0772978470', 'thidaihoc29012000@gmail.com', '2018-2022'),
            ( 11, 1, 1, '102180064', N'Trần Vĩnh Đạt', 1, '26-May-2000', '0772978470', 'thidaihoc29012000@gmail.com', '2018-2022'),
            ( 12, 1, 1, '102180065', N'Nguyễn Thị Phương Thảo', 0, '26-May-2000', '0772978470', 'thidaihoc29012000@gmail.com', '2018-2022'),
            ( 13, 1, 1, '102180066', N'Phạm Linh Quyên', 0, '26-May-2000', '0772978470', 'thidaihoc29012000@gmail.com', '2018-2022'),
            ( 14, 1, 1, '102180067', N'Đoàn Ngọc Bảo Châu', 0, '26-May-2000', '0772978470', 'thidaihoc29012000@gmail.com', '2018-2022'),
            ( 15, null, 1, 'GV_1', N'Phạm Xuân Trà', 1, '26-May-2000', '0772973112', 'xuantra@gmail.com',  null),
            ( 16, null, 1, 'GV_2', N'Khoa Bùi', 1, '26-May-2000', '0772973112', 'xuantra@gmail.com',  null),
            ( 17, null, 2, 'GV_3', N'Nhân Lý', 1, '26-May-2000', '0772973112', 'xuantra@gmail.com',  null),
            ( 18, null, 3, 'GV_4', N'Nguyễn Thị Minh Hiếu', 1, '26-May-2000', '0772973112', 'xuantra@gmail.com',  null),
            ( 19, null, 3, 'GV_5', N'Nguyễn Văn Dũng', 1, '26-May-2000', '0772973112', 'xuantra@gmail.com',  null),
            ( 20, null, 2, 'GV_6', N'Mai Thị Nga', 1, '26-May-2000', '0772973112', 'xuantra@gmail.com',  null)
      END    


 IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'LopHocPhan')
      BEGIN
        create table LopHocPhan
        (
          id										int IDENTITY(1,1) not null
            CONSTRAINT PK__LopHocPhan PRIMARY KEY CLUSTERED,
          hocPhanId						int not null
            CONSTRAINT FK_LopHocPhan_hocPhan_hocPhanId REFERENCES HocPhan(id),
          giangVienId						int null
            CONSTRAINT FK_LopHocPhan_giangVien_giangVienId REFERENCES NguoiDung(id),
          namHocId						int not null
            CONSTRAINT FK_LopHocPhan_namHoc_namHocId REFERENCES NamHoc(id),
          hocKyId						int not null
            CONSTRAINT FK_LopHocPhan_hocKy_hocKyId REFERENCES HocKy(id),
        
          tenLop                          nvarchar(max) not null, 
          maLop							nvarchar(max) not null,
          

          validFrom								datetime2 GENERATED ALWAYS AS ROW START,
          validTo									datetime2 GENERATED ALWAYS AS ROW END,
          PERIOD FOR SYSTEM_TIME (validFrom, validTo)
        )
        insert into LopHocPhan(hocPhanId, giangVienId, namHocId, hocKyId, tenLop, maLop) values
            ( 1, 15, 2, 1, '18Nh11', '3942938123213PTTK'),
            ( 1, 16, 2, 1, '18Nh12', '3942931238233PTTK')
      END              

 IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'SinhVienLopHocPhan')
      BEGIN
        create table SinhVienLopHocPhan
        (
          id										int IDENTITY(1,1) not null
            CONSTRAINT PK__SinhVienLopHocPhan PRIMARY KEY CLUSTERED,
          lopHocPhanId						int not null
            CONSTRAINT FK_SinhVienLopHocPhan_lopHocPhan_lopHocPhanId REFERENCES LopHocPhan(id),
          sinhVienId						int not null
            CONSTRAINT FK_SinhVienLopHocPhan_sinhVien_sinhVienId REFERENCES NguoiDung(id),
        )
        insert into SinhVienLopHocPhan(lopHocPhanId, sinhVienId) values
            ( 1, 1),
            ( 1, 2),
            ( 1, 3),
            ( 1, 4),
            ( 1, 5),
            ( 1, 6),
            ( 1, 7)
      END 


 IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'KyThi')
      BEGIN
        create table KyThi
        (
          id										int IDENTITY(1,1) not null
            CONSTRAINT PK__KyThi PRIMARY KEY CLUSTERED,
          hocPhanId						int not null
            CONSTRAINT FK_KyThi_hocPhan_hocPhanId REFERENCES HocPhan(id),
          namHocId						int not null
            CONSTRAINT FK_KyThi_namHoc_namHocId REFERENCES NamHoc(id),
          cachThucGiamSatId    int not null 
            CONSTRAINT FK_KyThi_cachThucGiamSat_cachThucGiamSatId REFERENCES CachThucGiamSat(id),  
          hocKyId             int not null
            CONSTRAINT FK_KyThi_hocKy_hocKyId REFERENCES HocKy(id),

          kyThi              nvarchar(max) not null,
          timeStart          datetime2 not null,
          timeEnd            datetime2 not null,
          soCauHoi           int not null,
          thoiGianLamBai     int not null,
          soLuotLamBai       int null,
          password           nvarchar(max) not null,
          validFrom								datetime2 GENERATED ALWAYS AS ROW START,
          validTo									datetime2 GENERATED ALWAYS AS ROW END,
          PERIOD FOR SYSTEM_TIME (validFrom, validTo)
        )
        insert into KyThi(hocPhanId, namHocId, hocKyId, kyThi, timeStart, timeEnd, soCauHoi, thoiGianLamBai, soLuotLamBai, password, cachThucGiamSatId) values
            ( 1, 1, 1, N'Kiểm tra cuối kỳ 1', '26-May-2023', '26-May-2023', 40, 40, 1, '123', 1)
      END 


 IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'LopHocPhanKyThi')
      BEGIN
        create table LopHocPhanKyThi
        (
          id										int IDENTITY(1,1) not null
            CONSTRAINT PK__LopHocPhanKyThi PRIMARY KEY CLUSTERED,
          lopHocPhanId						int not null
            CONSTRAINT FK_LopHocPhanKyThi_lopHocPhan_lopHocPhanId REFERENCES LopHocPhan(id),
          kyThiId						int not null
            CONSTRAINT FK_LopHocPhanKyThi_kyThi_kyThiId REFERENCES KyThi(id),
        )
        insert into LopHocPhanKyThi(lopHocPhanId, kyThiId) values
            (1, 1)
      END 


IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'CauHoi')
      BEGIN
        create table CauHoi
        (
          id										int IDENTITY(1,1) not null
            CONSTRAINT PK__CauHoi PRIMARY KEY CLUSTERED,
          hocPhanId						int not null
            CONSTRAINT FK_CauHoi_hocPhan_hocPhanId REFERENCES HocPhan(id),
          mucDoCauHoiId						int not null
            CONSTRAINT FK_CauHoi_mucDoCauHoi_mucDoCauHoiId REFERENCES MucDoCauHoi(id),

          tenCauHoi                nvarchar(max) not null,
          cauHoi                   nvarchar(max) not null  
        )
        insert into CauHoi(hocPhanId, mucDoCauHoiId, tenCauHoi, cauHoi) values
            (1, 1, N'Câu 1', N'Để xây dựng mô hình hệ thống, kỹ sư phải quan tâm tới một trong những nhân tố hạn chế sau:'),
            (1, 1, N'Câu 2', N'Trong kỹ thuật tiến trình nghiệp vụ, ba kiến trúc khác nhau được kiểm tra'),
            (1, 1, N'Câu 3', N'Ba giai đoạn tổng quát của công nghệ phần mềm'),
            (1, 1, N'Câu 4', N'Mô hình phát triển ứng dụng nhanh'),
            (1, 1, N'Câu 5', N'Mô hình phát triển phần mềm lặp lại tăng thêm'),
            (1, 1, N'Câu 6', N'Mô hình phát triển phần mềm xoắn ốc'),
            (1, 1, N'Câu 7', N'Mô hình phát triển dựa vào thành phần'),
            (1, 2, N'Câu 8', N'Thành phần nào của kỹ thuật tiến trình nghiệp vụ là trách nhiệm của kỹ sư phần mềm'),
            (1, 2, N'Câu 9', N'Những thành phần kiến trúc trong kỹ thuật sản phẩm là'),
            (1, 2, N'Câu 10', N'Đặc tả hệ thống mô tả'),
            (1, 2, N'Câu 11', N'Phân tích giá trị được dẫn ra như là một phần của QFD (quality function deployment) nhằm xác định'),
            (1, 2, N'Câu 12', N'Use-cases là một kịch bản mà mô tả '),
            (1, 3, N'Câu 13', N'Nội dung thông tin biểu diễn những đối tượng điều khiển và dữ liệu riêng biệt mà bao gồm những thông tin mà '),
            (1, 3, N'Câu 14', N'Dòng thông tin biểu diễn cách thức mà dữ liệu và điều khiển'),
            (1, 3, N'Câu 15', N'Loại mô hình nào được tạo ra trong phân tích yêu cầu phần mềm '),
            (1, 2, N'Câu 16', N'Trong ngữ cảnh của phân tích yêu cầu, hai loại phân tách vấn đề là'),
            (1, 2, N'Câu 17', N'Khung nhìn (view) nào được quan tâm đầu tiên trong phân tich yêu cầu phần mềm'),
            (1, 2, N'Câu 18', N'Tạo nguyên mẫu tiến hóa thường thích được dùng hơn tạo nguyên mẫu bỏ đi bởi vì '),
            (1, 2, N'Câu 19', N'Những mục nào không là nguyên tắc cho việc biểu diễn yêu cầu'),
            (1, 2, N'Câu 20', N'Mục nào không là một  mục đích cho việc xây dựng một mô hình phân tích'),
            (1, 2, N'Câu 21', N'Sự quan trọng của thiết kế phần mềm có thể được tóm tắt bằng từ đơn'),
            (1, 2, N'Câu 22', N'Một đặc trưng của thiết kế tốt là'),
            (1, 2, N'Câu 23', N'Mục nào không là đặc trưng chung trong các phương pháp thiết kế '),
            (1, 2, N'Câu 24', N'Loại trừu tượng nào được dùng trong thiết kế phần mềm'),
            (1, 2, N'Câu 25', N'Loại mô hình nào không được có trong kiến trúc phần mềm'),
            (1, 2, N'Câu 26', N'Cấp bậc điều khiển thể hiện'),
            (1, 3, N'Câu 27', N'Thủ tục phần mềm tập trung vào'),
            (1, 3, N'Câu 28', N'Nguyên nhân của việc sinh lỗi do thiết kế mức thành phần trước khi thiết kế dữ liệu là '),
            (1, 3, N'Câu 29', N' Mục đích của tham chiếu chéo những yêu cầu (ma trận) trong tài liệu thiết kế là nhằm'),
            (1, 3, N'Câu 30', N'Mục nào không là một phần của kiến trúc phần mềm'),
            (1, 3, N'Câu 31', N'Đặc trưng nào là đúng cho kho dữ liệu, không phải là cơ sở dữ liệu đặc trưng'),
            (1, 3, N'Câu 32', N'Mẫu kiến trúc nhấn mạnh tới những thành phần'),
            (1, 3, N'Câu 33', N'Những nguyên lý thiết kế giao diện nào không cho phép người dùng còn điều khiển tương tác với máy tính'),
            (1, 3, N'Câu 34', N'Những nguyên lý thiết kế giao diện cho phép người dùng ít phải nhớ'),
            (1, 2, N'Câu 35', N'Sự toàn vẹn (consistency) giao diện ngầm định'),
            (1, 2, N'Câu 36', N'Mô hình nào đưa ra hình ảnh tiền sử (profile) người dùng cuối của hệ thống dựa vào máy tính'),
            (1, 2, N'Câu 37', N'Mô hình nào đưa ra hình ảnh hệ thống trong đầu của người dùng cuối '),
            (1, 2, N'Câu 38', N'Mô hình nào đưa ra hình ảnh look and feel cho giao diện người dùng cùng những thông tin hỗ trợ'),
            (1, 2, N'Câu 39', N'Những hoạt động khung nào thường không kết hợp với những quá trình thiết kế giao diện người dùng'),
            (1, 2, N'Câu 40', N'Hướng tiếp cận nào để những phân tích tác vụ của người dùng trong thiết kế giao diện người dùng'),
            (1, 2, N'Câu 41', N'Những vấn đề thiết kế chung nổi trội lên trong hầu hết giao diện người dùng '),
            (1, 2, N'Câu 42', N'Những hệ thống phát triển giao diện người dùng đặc trưng cung cấp những kỹ thuật cho việc xây dựng những nguyên mẫu giao diện bao gồm '),
            (1, 2, N'Câu 43', N'Những bản câu hỏi có ý nghĩa nhất đối với những người thiết kế giao diện khi được hoàn tất bởi'),
            (1, 2, N'Câu 44', N'Nhiều đo lường hữu dụng có thể thu thập khi quan sát những người dùng tương tác với hệ thống máy tính gồm'),
            (1, 2, N'Câu 45', N'Một bảng quyết định được dùng'),
            (1, 2, N'Câu 46', N'Lý do tốt nhất cho việc dùng nhóm kiểm tra phần mềm độc lập là'),
            (1, 2, N'Câu 47', N'Trong một dự án thành công sử dụng chiến lược '),
            (1, 2, N'Câu 48', N'Kiểm thử tích hợp Top-down có thuận lợi chính là'),
            (1, 1, N'Câu 49', N'Kiểm thử tích hợp bottom-up có những thuận lợi chính'),
            (1, 1, N'Câu 50', N'Hướng debug'),
            (1, 1, N'Câu 51', N'Những kiểm tra chấp nhận thường được đưa ra bởi')
      END       


 IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'DapAn')
      BEGIN
        create table DapAn
        (
          id										int IDENTITY(1,1) not null
            CONSTRAINT PK__DapAn PRIMARY KEY CLUSTERED,
          cauHoiId						int not null
            CONSTRAINT FK_DapAn_cauHoi_cauHoiId REFERENCES CauHoi(id),
         
          dapAn             nvarchar(max) not null,
          dapAnDung         bit not null
        )
        insert into DapAn(cauHoiId, dapAn, dapAnDung) values
            (1, N'Những giả định và những ràng buộc', 1),
            (1, N'Ngân sách và phí tổn', 0),
            (1, N'Những đối tượng và những hoạt động', 0),
            (1, N'Lịch biểu và các mốc sự kiện', 0),
            (2, N'Hạ tầng kỹ thuật, dữ liệu, ứng dụng', 1),
            (2, N'Hạ tầng tài chánh, tổ chức và truyền thông', 0),
            (2, N'Cấu trúc báo cáo, cơ sở dữ liệu, mạng', 0),
            (2, N'Cấu trúc dữ liệu, yêu cầu, hệ thống', 0),
            (3, N'Tại sao chi phí phần cứng máy tính quá cao?', 1),
            (3, N'Tại sao phần mềm mất một thời gian dài để hoàn tất?', 0),
            (3, N'Tại sao người ta tốn nhiếu chi phí để phát triển một mẩu phần mềm?', 0),
            (3, N'Tại sao những lỗi phần mềm không được loại bỏ trong sản phẩm trước khi xuất xưởng', 0),
            (4, N'definition, development, support', 1),
            (4, N'what, how, where ', 0),
            (4, N'programming, debugging, maintenance', 0),
            (4, N'analysis, design, testing', 0),
            (5, N'Một cách gọi khác của mô hình phát triển dựa vào thành phần', 0),
            (5, N'Một cách hữu dụng khi khách hàng không xàc định yêu cầu rõ ràng', 0),
            (5, N'Sự ráp nối tốc độ cao của mô hình tuần tự tuyến tính', 1),
            (5, N'Tất cả mục trên', 0),
            (6, N'Bản chất lặp', 0),
            (6, N'Dễ dàng điều tiết những biến đổi yêu cầu sản phẩm ', 0),
            (6, N'Nói chung không tạo ra những sản phẩm bỏ đi', 0),
            (6, N'Tất cả các mục', 1),
            (7, N'Một hướng hợp lý khi yêu cầu được xác định rõ', 0),
            (7, N'Một hƣớng tốt khi cần tạo nhanh một sản phẩm thực thi lõi', 0),
            (7, N'Một hướng tốt nhất dùng cho những dự án có những nhóm phát triển lớn', 1),
            (7, N'Một mô hình cách mạng không nhưng không được dùng cho sản phẩm thương mại', 0),
            (8, N'Kết thúc với việc xuất xưởng sản phẩm phần mềm', 0),
            (8, N'Nhiều hỗn độn hơn với mô hình gia tăng', 1),
            (8, N'Bao gồm việc đánh giá những rủi ro phần mềm trong mỗi vòng lặp', 0),
            (8, N'Tất cả điều trên', 0),
            (9, N'Chỉ phù hợp cho thiết kế phần cứng máy tính', 0),
            (9, N'Không thể hỗ trợ phát triển những thành phần sử dụng lại', 0),
            (9, N'Dựa vào những kỹ thuật hỗ trợ đối tƣợng', 1),
            (9, N'Không định chi phí hiệu quả bằng những độ đo phần mềm có thể định lượng', 0),
            (10, N'Những giả định và những ràng buộc', 1),
            (10, N'Ngân sách và phí tổn', 0),
            (10, N'Những đối tượng và những hoạt động', 0),
            (10, N'Lịch biểu và các mốc sự kiện', 0),
            (11, N'Hạ tầng kỹ thuật, dữ liệu, ứng dụng', 1),
            (11, N'Hạ tầng tài chánh, tổ chức và truyền thông', 0),
            (11, N'Cấu trúc báo cáo, cơ sở dữ liệu, mạng', 0),
            (11, N'Cấu trúc dữ liệu, yêu cầu, hệ thống', 0),
            (12, N'Phân tích phạm vi nghiệp vụ', 0),
            (12, N'Thiết kế hệ thống nghiệp vụ', 1),
            (12, N'Kế hoạch sản phẩm', 0),
            (12, N'Kế hoạch chiến lược thông tin', 0),
            (13, N'Dữ liệu, phần cứng, phần mềm, con ngƣời ', 1),
            (13, N'Dữ liệu, tài liệu, phần cứng, phần mềm', 0),
            (13, N'Dữ liệu, phần cứng, phần mềm, thủ tục', 0),
            (13, N'Tài liệu, phần cứng, con người, thủ tục', 0),
            (14, N'Chức năng và hành vi của hệ thống dựa vào máy tính', 0),
            (14, N'Việc thi hành của mỗi thành phần hệ thống được chỉ', 1),
            (14, N'Chi tiết giải thuật và cấu trúc hệ thống', 0),
            (14, N'Thời gian đòi hỏi cho việc giả lập hệ thống', 0),
            (15, N'Chi phí của hoạt động đảm bảo chất lượng của dự án', 0),
            (15, N'Chi phí quan hệ của những yêu cầu qua việc triển khai chức năng, tác vụ và thông tin ', 1),
            (15, N'Độ ƣu tiên quan hệ của những yêu cầu qua việc triển khai chức năng, tác vụ và thông tin', 0),
            (15, N'Kích thước của bản ý kiến khách hàng', 0),
            (16, N'Phần mềm thực hiện nhƣ thế nào khi đƣợc dùng trong một tình huống cho trƣớc', 0),
            (16, N'Những công cụ CASE sẽ được dùng như thế nào để xây dựng hệ thống', 1),
            (16, N'Kế hoạch xây dựng cho sản phẩm phần mềm', 0),
            (16, N'Những test-case cho sản phẩm phần mềm', 0),
            (17, N'Cần thiết để trình bày tất cả output', 0),
            (17, N'Được đòi hỏi cho việc xử lý lỗi', 1),
            (17, N'Được đòi hỏi cho hoạt động tạo giao diện hệ thống', 0),
            (17, N'Đƣợc biến đổi bởi phần mềm', 0),
            (18, N'Quan hệ với một dữ liệu và điều khiển khác', 0),
            (18, N'Biến đổi khi mỗi lần dịch chuyển qua hệ thống', 1),
            (18, N'Sẽ được thực thi trong thiết kế cuối cùng', 0),
            (18, N'Không có mục nào', 0),
            (19, N'Những cấu trúc dữ liệu dùng để biểu diễn loại dữ liệu', 0),
            (19, N'Mô hình bố trí nhân viên dự án', 1),
            (19, N'Mô hình truyền thông dự án ', 0),
            (19, N'Những dữ liệu khác nhau và những mục điều khiển', 0),
            (20, N'Chức năng và hành vi', 0),
            (20, N'Giải thuật và cấu trúc dữ liệu', 1),
            (20, N'Kiến trúc và cấu trúc ', 0),
            (20, N'Tính tin cậy và tính sử dụng', 0),
            (21, N'bottom-up và top-down', 0),
            (21, N'horizontal and vertical', 1),
            (21, N'subordinate và superordinate', 0),
            (21, N'Không có mục nào', 0),
            (22, N'actor view', 0),
            (22, N'data view', 1),
            (22, N'essential view ', 0),
            (22, N'implementation view', 0),
            (23, N'Cho phép tái sử dụng nguyên mẫu đầu', 0),
            (23, N'Không đòi hỏi làm việc nhiều với khách hàng', 1),
            (23, N'Dễ dành thực hiện nhanh', 0),
            (23, N'Nhiều tin cậy hơn', 0),
            (24, N'Biểu đồ phải thu hẹp về số và toàn vẹn trong sử dụng', 0),
            (24, N'Hình thức và nội dung biểu diễn thích hợp với nội dung', 1),
            (24, N'Những biểu diễn phải có thể xem xét lại', 0),
            (24, N'Dùng không hơn 7 màu dƣơng và 2 màu âm trong biểu đồ', 0),
            (25, N'Xác định một tập những yêu cầu phần mềm', 0),
            (25, N'Mô tả yêu cầu khách hàng', 1),
            (25, N'Phát triển một giải pháp tóm tắt cho vấn đề', 0),
            (25, N'Thiết lập một nền tảng cho thiết kế phần mềm', 0),
            (26, N'Accuracy', 0),
            (26, N'Complexity', 1),
            (26, N'Efficiency ', 0),
            (26, N'Quality', 0),
            (27, N'Cho thấy sự liên kết mạnh giữa các module', 0),
            (27, N'Thực hiện tất cả yêu cầu trong phân tích', 1),
            (27, N'Bao gồm những test case cho tất cả thành phần', 0),
            (27, N'Kết hợp mã nguồn nhằm mục đích mô tả', 0),
            (28, N'Quản lý cấu hình', 0),
            (28, N'Ký hiệu thành phần chức năng', 1),
            (28, N'Nguyên tắc đánh giá chất lượng', 0),
            (28, N'Heuristic tinh chế', 0),
            (29, N'Điều khiển', 0),
            (29, N'Dữ liệu', 1),
            (29, N'Thủ tục', 0),
            (29, N'Tất cả mục trên', 0),
            (30, N'Dữ liệu', 0),
            (30, N'Động', 1),
            (30, N'Xử lý', 0),
            (30, N'Cấu trúc', 0),
            (31, N'Thứ tự quyết định', 0),
            (31, N'Việc tổ chức của các module', 1),
            (31, N'Sự lặp lại của những hoạt động', 0),
            (31, N'Sự tuần tự của các tiến trình', 0),
            (32, N'Cấp bậc điều khiển trong một cảm nhận trừu tượng hơn', 0),
            (32, N'Xử lý chi tiết của mỗi module riêng biệt', 1),
            (32, N'Xử lý chi tiết của mỗi tập module ', 0),
            (32, N'Quan hệ giữa điều khiển và thủ tục', 0),
            (33, N'Thiết kế thành phần thì phụ thuộc vào ngôn ngữ còn thiết kế dữ liệu thì không ', 0),
            (33, N'Thiết kế dữ liệu thì dễ thực hiện hơn', 1),
            (33, N'Thiết kế dữ liệu thì khó thực hiện', 0),
            (33, N'Cấu trúc dữ liệu thƣờng ảnh hƣởng tới cách thức mà thíết kế thành phần phải theo', 0),
            (34, N'Cho phép người quản lý theo dõi năng suất của nhóm thiết kế', 0),
            (34, N'Xác minh là tất cả các  yêu cầu đã đƣợc xem xét trong thiết kế', 1),
            (34, N'Chỉ ra chi phí kết hợp với mỗi yêu cầu', 0),
            (34, N'Cung cấp cho việc thực thi tên của những nhà thiết kế cho mỗi yêu cầu', 0),
            (35, N'Chi tiết giải thuật', 0),
            (35, N'Cơ sở dữ liệu', 1),
            (35, N'Thiết kế dữ liệu', 0),
            (35, N'Cấu trúc chương trình', 0),
            (36, N'Hướng mức nghiệp vụ và kích thước lớn', 0),
            (36, N'Thông tin đúng và hợp thời', 1),
            (36, N'Tích hợp và không thƣờng thay đổi', 0),
            (36, N'Tất cả những mục trên', 0),
            (37, N'Ràng buộc', 0),
            (37, N'Tập hợp những thành phần', 1),
            (37, N'Mô hình ngữ nghĩa', 0),
            (37, N'Tất cả những mục', 0),
            (38, N'Cho phép được gián đoạn', 0),
            (38, N'Cho phép tương tác có thể undo', 1),
            (38, N'Che dấu những bản chất kỹ thuật với những người dùng thường', 0),
            (38, N'Chỉ cung cấp một cách thức xác định cứng khi hoàn thành tác vụ', 0),
            (39, N'Xác định những shortcut trực quan', 0),
            (39, N'Biểu lộ thông tin theo cách diễn tiến', 1),
            (39, N'Thiết lập những trường hợp mặc định có ý nghĩa', 0),
            (39, N'Tất cả những mục trên', 0),
            (40, N'Những kỹ thuật input giữ tương tự suốt ứng dụng', 0),
            (40, N'Mỗi ứng dụng phải có look and feel riêng biệt', 1),
            (40, N'Cách thức điều hướng (navigational) nhạy với ngữ cảnh', 0),
            (40, N'Câu a và b', 0),
            (41, N'Mô hình thiết kế ', 0),
            (41, N'Mô hình ngƣời dùng', 1),
            (41, N'Mô hình của người dùng', 0),
            (41, N'Mô hình nhận thức hệ thống', 0),
            (42, N'Mô hình thiết kế', 0),
            (42, N'Mô hình người dùng', 1),
            (42, N'Hình ảnh hệ thống', 0),
            (42, N'Mô hình nhận thức hệ thống', 0),
            (43, N'Ƣớc lƣợng giá', 0),
            (43, N'Xây dựng giao diện', 1),
            (43, N'Định trị giao diện', 0),
            (43, N'Phân tích người dùng và tác vụ', 0),
            (44, N'Người dùng cho biết những ưa thích qua bản câu hỏi', 0),
            (44, N'Dựa vào ý kiến của những lập trình viên có kinh nghiệm', 1),
            (44, N'Nghiên cứu những hệ thống tự động liên quan', 0),
            (44, N'Quan sát thao tác ngƣời dùng', 0),
            (45, N'Kết nối tiền sử người dùng (profile) và shortcut chức năng', 0),
            (45, N'Xử lý lỗi và thời gian đáp ứng của hệ thống', 1),
            (45, N'Quyết định hiển thị hình ảnh và thiết kế icon', 0),
            (45, N'Không có mục nào ', 0),
            (46, N'Tạo code ', 0),
            (46, N'Những tool vẽ', 1),
            (46, N'Định trị input', 0),
            (46, N'Tất cả mục trên', 0),
            (47, N'Khách hàng', 0),
            (47, N'Những lập trình viên có kinh nghiệm', 1),
            (47, N'Ngƣời dùng sản phẩm', 0),
            (47, N'Người quản  lý dự án', 0),
            (48, N'Thời gian cho ứng dụng', 0),
            (48, N'Số khiếm khuyết (defect) phần mềm', 1),
            (48, N'Tính tin cậy của phần mềm', 0),
            (48, N'Thời gian đọc tài liệu trợ giúp', 0),
            (49, N'Để tư liệu tất cả những trạng thái phụ thuộc', 0),
            (49, N'Để hướng dẫn phát triển kế hoạch quản lý dự án', 1),
            (49, N'Chỉ khi  xây dựng hệ chuyên gia ', 0),
            (49, N'Thời gian đọc tài liệu trợ giúp', 0),
            (50, N'Những người phát triển phần mềm không cần làm bất kỳ kiểm thử nào', 0),
            (50, N'Những người lạ sẽ kiểm phần mềm rất chặt', 1),
            (50, N'Những người kiểm thử không được dính dáng tới dự án cho đến khi kiểm thử bắt đầu', 0),
            (50, N'Mâu thuẩn về quyền lợi giữa những ngƣời phát triển và những ngƣời kiểm thử sẽ giảm', 0),
            (51, N'Đưa ra những xem xét kỹ thuật hình thức ưu tiên trước khi kiểm thử', 0),
            (51, N'Chỉ rõ những yêu cầu trong theo một cách thức có thể định lượng', 1),
            (51, N'Quan tâm tới việc sử dụng những nhóm kiểm thử độc lập', 0),
            (51, N'Tất cả đáp án trên', 0)
      END       


 IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'KetQuaLamBai')
      BEGIN
        create table KetQuaLamBai
        (
          id										int IDENTITY(1,1) not null
            CONSTRAINT PK__KetQuaLamBai PRIMARY KEY CLUSTERED,
          hocPhanId						int not null
            CONSTRAINT FK_KetQuaLamBai_hocPhan_hocPhanId REFERENCES HocPhan(id),
          kyThiId						int not null
            CONSTRAINT FK_KetQuaLamBai_kyThi_kyThiId REFERENCES KyThi(id),
          namHocId						int not null
            CONSTRAINT FK_KetQuaLamBai_namHoc_namHocId REFERENCES NamHoc(id),
          hocKyId						int not null
            CONSTRAINT FK_KetQuaLamBai_hocKy_hocKyId REFERENCES HocKy(id),
          lopHocPhanId        int not null
            CONSTRAINT FK_KetQuaLamBai_lopHocPhan_lopHocPhanId REFERENCES LopHocPhan(id),
          sinhVienId          int not null
            CONSTRAINT FK_KeyQuaLamBai_sinhVien_sinhVienId REFERENCES NguoiDung(id),  

          timeStart    datetime2 not null,
          timeEnd      datetime2 not null,
          tongSoCauHoi      int not null,
          soCauDung         int not null,
          soLanViPham       int not null  
        )
        insert into KetQuaLamBai(hocPhanId, kyThiId, namHocId, hocKyId, lopHocPhanId, sinhVienId, timeStart, timeEnd, tongSoCauHoi, soCauDung, soLanViPham) values
            (1, 1, 1, 1, 1, 1, '2022-11-22T16:35:34.213Z', '2022-11-22T16:35:34.213Z', 40, 35, 1)
      END       