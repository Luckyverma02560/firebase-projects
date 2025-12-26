export const metadata = {
  verification: {
    google: "SU7TF2XEeS_xzsBUaIteDHVGqZ0DsZ6Gr7Y3Ad_W66A",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>{children}</body>
    </html>
  );
}
