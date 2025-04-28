# API Documentation

## Base URL

```
http://localhost:3000
```

---

## Endpoints

### Upload Receipt

**POST** `/v1/receipt/upload`

| Field | Value |
|:---|:---|
| URL | `/v1/receipt/upload` |
| Method | `POST` |
| Authentication | Requires `x-api-key` header |
| Content-Type | `multipart/form-data` |
| Body | Single file upload under the field name `receipt` |

### Request Headers

| Header | Required | Description |
|:---|:---|:---|
| `x-api-key` | ✅ | API Key to authorize the request |

Example:

```http
x-api-key: your-api-key
```

### Request Body

**Form Data:**

| Field | Type | Required | Description |
|:---|:---|:---|:---|
| `receipt` | File (image/pdf) | ✅ | Receipt image or PDF file to be processed |

Allowed file types:
- JPEG
- PNG
- PDF

Maximum file size:
- 5MB (or configured limit)

### Example CURL request:

```bash
curl -X POST http://localhost:3000/v1/receipt/upload   -H "x-api-key: your-api-key"   -F "receipt=@/path/to/receipt.jpg"
```

### Successful Response (200 OK)

```json
{
  "supplierName": "Hanks Hankies",
  "totalAmount": "122.17",
  "invoiceDate": "Apr 1, 2025",
  "currency": "S$",
  "supplierAddress": "123 Street\nSingapore\n12345",
  "purchaseOrder": "2025040101",
  "lineItem": "54.70 1 54.70 Pink hanky\nThis one is pink."
}
```

- Fields are returned in camelCase.
- Only detected fields are included.

### Error Responses

| Status Code | Message | Reason |
|:---|:---|:---|
| `400 Bad Request` | Invalid file type or size | Uploaded file is not an image/PDF or too large |
| `401 Unauthorized` | Invalid or missing `x-api-key` header | API key missing or incorrect |
| `500 Internal Server Error` | Failed to process receipt | Document AI processing error or server issue |

---

## Notes

- Rate limiting is applied to avoid abuse (e.g., 10 requests per minute).
- Uploaded files must meet MIME type and size requirements.
- Ensure your `x-api-key` matches the configured environment variable.