module.exports = {
  images: {
    domains: ['localhost','books.google.com'],
  },
async headers() {
    return [
      {
        source: '/:all*(svg|jpg|png)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, must-revalidate',
          }
        ],
      },
    ]
  }
}