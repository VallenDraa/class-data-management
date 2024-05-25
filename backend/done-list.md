### Pusat autentikasi

-   [x] POST /admin/login --- (Tidak memerlukan Auth token)
-   [x] POST /mahasiswa/login --- (Tidak memerlukan Auth token)
-   [x] POST /logout --- (Memerlukan Auth token)
-   [ ] POST /refresh-token --- (Memerlukan Auth token)

### Data mahasiswa

-   [x] GET /mahasiswa --- (Memerlukan Auth token)
-   [x] POST /mahasiswa --- (Memerlukan Admin authorization)
-   [x] PUT /mahasiswa --- (Memerlukan Auth token)
-   [ ] DELETE /mahasiswa --- (Memerlukan Admin authorization)
-   [ ] GET /mahasiswa/{id} --- (Memerlukan Auth token)
-   [x] PUT /mahasiswa/{id} --- (Memerlukan Admin authorization)
-   [ ] GET /mahasiswa/{id}/history --- (Memerlukan Admin authorization)
-   [ ] POST /mahasiswa/{id}/history --- (Memerlukan Auth token)
-   [ ] GET /mahasiswa/self --- (Memerlukan Auth token)
