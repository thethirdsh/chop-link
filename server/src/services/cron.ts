import cron from 'node-cron'
import { PrismaClient } from '@prisma/client'
import axios from 'axios'

const prisma = new PrismaClient()

cron.schedule('0 0 * * *', async () => {
  // Runs every 24 hours
  console.log('Checking for broken links...')

  const links = await prisma.link.findMany() // Get all links

  for (const link of links) {
    const isAlive = await isUrlAlive(link.original)
    if (!isAlive) {
      await prisma.link.delete({ where: { id: link.id } })
      console.log(`Deleted expired link: ${link.short} -> ${link.original}`)
    }
  }
})

const isUrlAlive = async (url: string): Promise<boolean> => {
  try {
    const response = await axios.head(url, { timeout: 5000 }) // Send HEAD request (faster than GET)
    return response.status >= 200 && response.status < 400 // Consider it valid if status is 2xx or 3xx
  } catch (error) {
    return false // Any error (timeout, 404, etc.) means the link is broken
  }
}
