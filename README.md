# yudanobi

## Catatan Tampilan
- saya mengganti error message karena menurut saya akan lebih informatif jika ditampilkan sebagai kesalahan ketika masuk saja
- karena menurut saya dengan response error login yang tersedia akan lebih baik dan lebih informatif jika ditampilkan menjadi satu.
- saya menghilangkan back button di home screen listing karena menurut saya hal itu tidak diperlukan.


## Terkait error
- jika terdapat error berkaitan dengan ios dan m1 architecture
    - coba run applikasi langsung dari xcode
    - jika tidak berhasil cek Xcode -> Build Setting . bagian tab Architecture -> Excluded Architecture -> tambahkan arm64 untuk debug dan releasenya