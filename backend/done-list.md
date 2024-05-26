### Pusat autentikasi

-   [x] POST /admin/login --- (Tidak memerlukan Auth token)
-   [x] POST /mahasiswa/login --- (Tidak memerlukan Auth token)
-   [x] POST /logout --- (Memerlukan Auth token)
-   [ ] POST /refresh-token --- (Memerlukan Auth token)

### Data mahasiswa

-   [x] GET /mahasiswa --- (Memerlukan Auth token)
-   [x] POST /mahasiswa --- (Memerlukan Admin authorization)
-   [x] PUT /mahasiswa --- (Memerlukan Auth token)
-   [x] DELETE /mahasiswa --- (Memerlukan Admin authorization)
-   [x] GET /mahasiswa/{id} --- (Memerlukan Auth token)
-   [x] PUT /mahasiswa/{id} --- (Memerlukan Admin authorization)
-   [x] GET /mahasiswa/{id}/history --- (Memerlukan Admin authorization)
-   [x] POST /mahasiswa/{id}/history --- (Memerlukan Auth token)
-   [x] GET /mahasiswa/self --- (Memerlukan Auth token)
-   [x] POST /mahasiswa/password --- (Memerlukan Auth token)
