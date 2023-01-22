# How

clone this repo
then run:
**To start**

```md
npm run start
```

**To develop**

```md
npm run dev
```

# Kampus API Documentation

## Models :

_Mahasiswa_

```
- nama : string, required
```

_Matkul_

```
- nama : string, required
```

_RencanaStudi_

```
- IdMahasiswa: integer, required
- IdMatkul : integer, required
```

## Endpoints :

List of available endpoints:

- `GET /mahasiswa`
- `POST /mahasiswa`
- `GET /mahasiswa/:id`
- `DELETE /mahasiswa/:id`
- `PATCH /mahasiswa/:id`

- `GET /matkul`
- `POST /matkul`
- `PATCH /matkul/:id`
- `DELETE /matkul/:id`

- `GET /studi`
- `POST /studi`
- `PATCH /studi/:id`
- `DELETE /studi/:id`

&nbsp;

## 1. GET /mahasiswa

#### Response

_Response (200 - OK)_

```json
[
    {
        "id": Integer,
        "nama": String
    },
    ...
]
```

&nbsp;

## 2. POST /mahasiswa

#### Request

- Body

  ```json
  {
    "nama": String,
  }
  ```

#### Response

_Response (201 - Created)_

```json
{
  "message": ":nama berhasil ditambahkan kedalam database dan mendapatkan id :id"
}
```

_400 - Bad Request_

```json
{
  "message": "You forgot to give a nama"
}
OR
{
  "message": "nama format invalid"
}
```
