import './dotenv'
import { app } from './app'

const PORT = 3000

app.listen(PORT, () => {
  console.log(`🚀 server running on http://localhost:${PORT}`)
})
