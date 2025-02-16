import { Request, Response } from 'express'

export const redirectLink = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    const { prisma } = req.context
    const shortUrl = `${req.url}`.split('/').pop()

    const link = await prisma.link.findFirst({ where: { short: shortUrl } })

    if (!link)
      return res
        .status(404)
        .json({ message: 'Link does not exist', data: { link, shortUrl } })

    await prisma.link.update({
      where: {
        short: shortUrl,
      },
      data: {
        clicks: {
          increment: 1,
        },
      },
    })

    return res.redirect(link.original)
  } catch (error) {
    return res.status(500).json({ message: error })
  }
}
