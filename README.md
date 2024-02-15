
## API Reference

#### Text to Text

```http
  POST /api/correct
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |
| `text` | `string` | **Required** |

#### Image to Image

```http
  POST /api/readimage
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |
| `text` | `string` | **Required**|
| `size` | `number` | **Required**|

#### Text to Image

```http
  POST /api/gptimage
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |
| `text` | `string` | **Required**|
| `size` | `number` | **Required**|
