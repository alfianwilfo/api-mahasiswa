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
```
