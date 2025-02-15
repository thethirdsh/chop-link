import { Request, Response } from 'express'
import validateLink from '../../lib/validate-link'
import ShortUniqueId from 'short-unique-id'

export const createLink = async (req: Request, res: Response): Promise<any> => {
  try {
    const { prisma } = req.context
    const { url } = req.body

    if (!url) return res.status(400).json({ message: 'URL is required' })

    if (validateLink(url)) {
      const existingLink = await prisma.link.findFirst({
        where: {
          original: url,
        },
      })

      if (existingLink)
        return res
          .status(409)
          .json({ message: 'Link already exists', data: existingLink })

      const uid = new ShortUniqueId({ length: 5 })
      const urlId = uid.randomUUID()

      const short = `${urlId}`

      const link = await prisma.link.create({
        data: {
          original: url,
          short,
        },
      })

      if (!link) return res.status(500).json({ message: 'Error creating link' })

      return res
        .status(201)
        .json({ message: 'Link created successfully', data: link })
    }

    return res.status(400).json({ message: 'Invalid URL' })
  } catch (error) {
    return res.status(500).json({ message: error })
  }
}
