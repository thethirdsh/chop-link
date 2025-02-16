import { Request, Response } from 'express'

export const listLinks = async (req: Request, res: Response): Promise<any> => {
  try {
    const { prisma } = req.context

    const links = await prisma.link.findMany()

    if (!links) return res.status(404).json({ message: 'No links found' })

    return res.status(200).json(links)
  } catch (error) {
    return res.status(500).json({ message: error })
  }
}
