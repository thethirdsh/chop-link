import { Request, Response } from 'express'

export const getLink = async (req: Request, res: Response): Promise<any> => {
  try {
    const { prisma } = req.context
    const { id } = req.params

    const link = await prisma.link.findUnique({
      where: {
        id,
      },
    })

    if (!link) return res.status(404).json({ message: 'Link does not exist' })

    return res
      .status(200)
      .json({ message: 'Link retrieved successfully', data: link })
  } catch (error) {
    return res.status(500).json({ message: error })
  }
}
