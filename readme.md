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

#### Description

- Get all mahasiswa

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

#### Description

- Create mahasiswa

#### Request

- Body

  ```json
  {
    "nama": String
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

&nbsp;

## 3. GET /mahasiswa/:id

#### Description

- Get mahasiswa by id

#### Response

_Response (200 - OK)_

```json
{
  "id": Integer,
  "nama": String,
  "RencanaStudis": [
    {
      "id": Integer,
      "Matkul": {
        "id": Integer,
        "nama": String
      }
    },
    ...
  ]
}
```

_404 - Not Found_

```json
{
  "message": "Mahasiswa not found"
}
```

&nbsp;

## 4. DELETE /mahasiswa/:id

#### Description

- Delete mahasiswa by id

#### Response

_Response (200 - OK)_

```json
{
  "message": "Success delete mahasiswa"
}
```

_404 - Not Found_

```json
{
  "message": "Mahasiswa not found"
}
```

&nbsp;

## 5. PATCH /mahasiswa/:id

#### Description

- Change mahasiswa name

#### Request

- Body

  ```json
  {
    "nama": String
  }
  ```

#### Response

_Response (200 - OK)_

```json
{
  "message": "Success update nama mahasiswa"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Mahasiswa not found"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "You forgot to give a nama"
}
OR
{
  "message": "nama format invalid"
}
```

## 6. GET /matkul

#### Description

- Get all matkul

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

## 7. POST /matkul

#### Description

- Create new matkul

#### Request

- Body
  ```json
  {
    "nama": String
  }
  ```

#### Response

_Response (201 - Created)_

```json
{
  "message": "Success create new matkul"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Nama matkul can't empty"
}
OR
{
    "message": "Nama matkul can only filled with character, number and white space"
}
OR
{
    "message": "Nama matkul length character must be at least 3 character"
}
OR
{
    "message": "Nama matkul already registered"
}
```

## 8. PATCH /matkul/:id

#### Description

- Update matkul name

#### Request

- Body
  ```json
  {
    "nama": String
  }
  ```

#### Response

_Response (200 - OK)_

```json
{
  "message": "Success update nama matkul"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Matkul not found"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Nama matkul can't empty"
}
OR
{
    "message": "Nama matkul can only filled with character, number and white space"
}
OR
{
    "message": "Nama matkul length character must be at least 3 character"
}
```

## 9. DELETE /matkul/:id

#### Description

- Delete matkul by id

#### Response

_Response (200 - OK)_

```json
{
  "message": "Success delete matkul"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Matkul not found"
}
```

## 10. GET /studi

#### Description

- Get all Rencana studi

#### Response

_Response (200 - OK)_

```json
[
  {
    "id": Integer,
    "IdMahasiswa": Integer,
    "IdMatkul": Integer,
    "Mahasiswa": {
      "id": Integer,
      "nama": String
    },
    "Matkul": {
      "id": Integer,
      "nama": String
    }
  },
  ...
]
```

## 11. POST /studi

#### Description

- Create new rencana studi

#### Request

- Body

  ```json
  {
    "IdMahasiswa": Integer,
  }
  ```

#### Response

_Response (201 - Created)_

```json
{
  "message": "Success create new rencana studi"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Invalid format IdMahasiswa"
}
OR
{
    "message": "Invalid format IdMatkul"
}
OR
{
    "message": "You already pick this matkul"
}
OR
{
    "message": "This rencana studi has reached limit"
}
OR
{
    "message": "Your rencana studi has reached limit"
}
OR
{
    "message": "This matkul full booked"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Mahasiswa not found"
}
OR
{
    "message": "Matkul not found"
}
```

## 12. PATCH /studi/:id

#### Description

- Update IdMatkul by id

#### Request

- Body

  ```json
  {
    "IdMatkul": Integer,
  }
  ```

#### Response

_Response (200 - OK)_

```json
{
  "message": "Success update rencana studi"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "You already pick this matkul"
}
OR
{
    "message": "IdMatkul can't empty"
}
OR
{
    "message": "Invalid IdMatkul format"
}
OR
{
    "message": "This matkul full booked"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Rencana studi not found"
}
OR
{
    "message": "Matkul not found"
}
```

## 13. DELETE /studi/:id

#### Description

- Delete rencana studi by id

#### Response

_Response (200 - OK)_

```json
{
  "message": "Rencana studi berhasil dihapus"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Rencana studi not found"
}
```
