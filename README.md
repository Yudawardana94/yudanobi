# yudanobi

```
Karena github tidak bisa mengupload file dengan size lebih besar dari 25mb dan hasil build apk android ini berukuran 27mb maka saya upload filenya ke google dive di link berikut
[a link] https://drive.google.com/drive/folders/1kicJZhcL4Fn5QcGDPr0Vt20CRI7EUdgH?usp=sharing
```

## Catatan Tampilan
- saya mengganti error message karena menurut saya akan lebih informatif jika ditampilkan sebagai kesalahan ketika masuk saja
- karena menurut saya dengan response error login yang tersedia akan lebih baik dan lebih informatif jika ditampilkan menjadi satu.
- saya menghilangkan back button di home screen listing karena menurut saya hal itu tidak diperlukan.


## Terkait error
- jika terdapat error berkaitan dengan ios dan m1 architecture
    - coba run applikasi langsung dari xcode
    - jika tidak berhasil cek Xcode -> Build Setting . bagian tab Architecture -> Excluded Architecture -> tambahkan arm64 untuk debug dan releasenya

## Cara menjalankan applikasi
```
npm install
```
```
yarn ios -> untuk menjalankan ios
yarn android -> untuk menjalankan android
```
atau
```
npm run ios -> untuk menjalankan ios
npm run android -> untuk menjalankan android
```

untuk clean project 
```
yarn clean:ios -> untuk ios
yarn clean:android -> untk android
```
atau
```
npm run clean:ios -> untuk ios
npm run clean:android -> untk android
```
