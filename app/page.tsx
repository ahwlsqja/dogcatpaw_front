'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';

export default function HomePage() {
  const { user, isAuthenticated, isLoading, login, logout } = useAuth();

  return (
    <main className="min-h-screen bg-gradient-to-br from-primary-light/20 via-secondary-light/20 to-accent-light/20">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-2xl">🐾</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              DogCatPaw
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <ConnectButton />
            {isAuthenticated && (
              <Button onClick={logout} variant="outline" size="sm">
                Logout
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-5xl font-bold text-text-primary mb-4">
            Decentralized Pet Identity Platform
          </h2>
          <p className="text-xl text-text-secondary mb-8">
            Register your pets on blockchain with Verifiable Credentials and biometric noseprints
          </p>

          {!isAuthenticated ? (
            <Card variant="elevated" className="max-w-md mx-auto">
              <CardHeader>
                <CardTitle>Welcome to DogCatPaw</CardTitle>
                <CardDescription>
                  Connect your wallet to get started
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <ConnectButton.Custom>
                    {({ account, chain, openConnectModal, mounted }) => {
                      const ready = mounted;
                      const connected = ready && account && chain;

                      if (!connected) {
                        return (
                          <Button
                            onClick={openConnectModal}
                            className="w-full"
                            size="lg"
                          >
                            Connect Wallet
                          </Button>
                        );
                      }

                      return (
                        <Button
                          onClick={login}
                          isLoading={isLoading}
                          className="w-full"
                          size="lg"
                        >
                          Sign In with Wallet
                        </Button>
                      );
                    }}
                  </ConnectButton.Custom>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card variant="elevated" className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>Welcome back, {user?.nickname || 'Guardian'}!</CardTitle>
                <CardDescription>
                  Wallet: {user?.walletAddress}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button onClick={() => (window.location.href = '/pet')} variant="primary">
                    My Pets
                  </Button>
                  <Button
                    onClick={() => (window.location.href = '/adoption')}
                    variant="secondary"
                  >
                    Adoption
                  </Button>
                  <Button
                    onClick={() => (window.location.href = '/story')}
                    variant="outline"
                  >
                    Stories
                  </Button>
                  <Button
                    onClick={() => (window.location.href = '/donation')}
                    variant="outline"
                  >
                    Donations
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card>
            <CardHeader>
              <div className="text-4xl mb-2">🔐</div>
              <CardTitle>Blockchain-based DIDs</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Each pet gets a unique Decentralized Identifier (DID) stored on Hyperledger Besu
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="text-4xl mb-2">👃</div>
              <CardTitle>Biometric Noseprints</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Secure pet identity verification using unique noseprint patterns
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="text-4xl mb-2">✅</div>
              <CardTitle>Verifiable Credentials</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Pet ownership and medical records as cryptographically verifiable credentials
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="text-4xl mb-2">🏠</div>
              <CardTitle>Adoption Platform</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Find your perfect companion and connect with pet guardians
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="text-4xl mb-2">📖</div>
              <CardTitle>Pet Stories</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Share daily moments and adoption reviews with the community
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="text-4xl mb-2">💝</div>
              <CardTitle>Donate & Support</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Help pets in need through our transparent donation system
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 py-8 border-t border-border bg-surface">
        <div className="container mx-auto px-4 text-center text-text-secondary">
          <p>© 2024 DogCatPaw. Decentralized Pet Identity Platform.</p>
          <p className="text-sm mt-2">Powered by Hyperledger Besu & Verifiable Credentials</p>
        </div>
      </footer>
    </main>
  );
}
