import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  // Only render Clerk SignIn if Clerk keys are configured
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background-base">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Authentication Disabled</h1>
          <p className="text-gray-600">Running in local development mode without authentication.</p>
          <a href="/" className="text-blue-500 hover:underline mt-4 inline-block">Go Home</a>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-background-base">
      <SignIn
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "shadow-lg",
          }
        }}
        routing="path"
        path="/sign-in"
        redirectUrl="/workflows"
        signUpUrl="/sign-up"
      />
    </div>
  )
}
