import { Request, Response } from 'express'

export const deleteLink = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    const { prisma } = req.context
    const { id } = req.params

    const link = await prisma.link.delete({
      where: {
        id,
      },
    })

    return res.status(204).end()
  } catch (error) {
    return res.status(500).json({ message: error })
  }
}
