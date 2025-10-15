'use client';

import { HeroSectionCentered, HeroSectionFlex } from '@/components/layout/HeroSection';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAuth } from '@/contexts/AuthContext';

export default function HomePage() {
  const { user, isAuthenticated, isLoading, login, logout } = useAuth();

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section with Background Image */}
      <HeroSectionCentered
        backgroundImage="/images/hero-bg.jpg"
        height={713}
        backgroundOpacity={0.75}
        overlayColor="rgb(211, 211, 211)"
      >
        {/* Hero Content */}
        <div className="space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 drop-shadow-lg">
            Decentralized Pet Identity
          </h1>
          <p className="text-xl md:text-2xl text-gray-800 max-w-2xl mx-auto">
            Register your pets on blockchain with Verifiable Credentials and biometric noseprints
          </p>

          {!isAuthenticated ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
              <ConnectButton.Custom>
                {({ account, chain, openConnectModal, mounted }) => {
                  const ready = mounted;
                  const connected = ready && account && chain;

                  if (!connected) {
                    return (
                      <Button
                        onClick={openConnectModal}
                        size="lg"
                        className="w-full sm:w-auto px-8 py-6 text-lg"
                      >
                        🔗 Connect Wallet
                      </Button>
                    );
                  }

                  return (
                    <Button
                      onClick={login}
                      isLoading={isLoading}
                      size="lg"
                      className="w-full sm:w-auto px-8 py-6 text-lg"
                    >
                      🐾 Sign In with Wallet
                    </Button>
                  );
                }}
              </ConnectButton.Custom>
            </div>
          ) : (
            <div className="mt-8">
              <Card variant="elevated" className="bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl">
                    Welcome back, {user?.nickname || 'Guardian'}!
                  </CardTitle>
                  <CardDescription className="text-base">
                    Wallet: {user?.walletAddress}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Button
                      onClick={() => (window.location.href = '/pet')}
                      variant="primary"
                      className="h-14"
                    >
                      🐕 My Pets
                    </Button>
                    <Button
                      onClick={() => (window.location.href = '/adoption')}
                      variant="secondary"
                      className="h-14"
                    >
                      🏠 Adoption
                    </Button>
                    <Button
                      onClick={() => (window.location.href = '/story')}
                      variant="outline"
                      className="h-14"
                    >
                      📖 Stories
                    </Button>
                    <Button
                      onClick={() => (window.location.href = '/donation')}
                      variant="outline"
                      className="h-14"
                    >
                      💝 Donate
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </HeroSectionCentered>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-primary-light/10 to-secondary-light/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-text-primary mb-4">
              Why Choose DogCatPaw?
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              The most advanced pet identity platform powered by blockchain technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Feature Cards */}
            <Card className="hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="text-5xl mb-4">🔐</div>
                <CardTitle className="text-xl">Blockchain-based DIDs</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Each pet gets a unique Decentralized Identifier (DID) stored securely on Hyperledger Besu blockchain
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="text-5xl mb-4">👃</div>
                <CardTitle className="text-xl">Biometric Noseprints</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Secure pet identity verification using unique noseprint patterns with ML-powered recognition
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="text-5xl mb-4">✅</div>
                <CardTitle className="text-xl">Verifiable Credentials</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Pet ownership and medical records as cryptographically verifiable W3C credentials
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="text-5xl mb-4">🏠</div>
                <CardTitle className="text-xl">Adoption Platform</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Find your perfect companion and connect with verified pet guardians
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="text-5xl mb-4">📖</div>
                <CardTitle className="text-xl">Pet Stories</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Share daily moments and adoption reviews with the pet-loving community
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="text-5xl mb-4">💝</div>
                <CardTitle className="text-xl">Transparent Donations</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Help pets in need through our blockchain-verified donation system
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">10K+</div>
              <div className="text-lg opacity-90">Registered Pets</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">5K+</div>
              <div className="text-lg opacity-90">Guardians</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">2K+</div>
              <div className="text-lg opacity-90">Adoptions</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">100%</div>
              <div className="text-lg opacity-90">Blockchain Verified</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-secondary-light/20 to-accent-light/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-text-primary mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
            Join thousands of pet guardians who trust DogCatPaw for secure, blockchain-based pet identity management
          </p>
          {!isAuthenticated && (
            <ConnectButton.Custom>
              {({ account, chain, openConnectModal, mounted }) => {
                const ready = mounted;
                const connected = ready && account && chain;

                if (!connected) {
                  return (
                    <Button
                      onClick={openConnectModal}
                      size="lg"
                      className="px-12 py-6 text-lg"
                    >
                      Get Started Now
                    </Button>
                  );
                }

                return (
                  <Button
                    onClick={login}
                    isLoading={isLoading}
                    size="lg"
                    className="px-12 py-6 text-lg"
                  >
                    Sign In to Continue
                  </Button>
                );
              }}
            </ConnectButton.Custom>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border bg-surface">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-2xl">🐾</span>
                </div>
                <h3 className="text-xl font-bold">DogCatPaw</h3>
              </div>
              <p className="text-text-secondary text-sm">
                Decentralized Pet Identity Platform powered by blockchain technology
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li><a href="/pet" className="hover:text-primary">My Pets</a></li>
                <li><a href="/adoption" className="hover:text-primary">Adoption</a></li>
                <li><a href="/story" className="hover:text-primary">Stories</a></li>
                <li><a href="/donation" className="hover:text-primary">Donations</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li><a href="/docs" className="hover:text-primary">Documentation</a></li>
                <li><a href="/api" className="hover:text-primary">API Reference</a></li>
                <li><a href="/whitepaper" className="hover:text-primary">Whitepaper</a></li>
                <li><a href="/support" className="hover:text-primary">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li><a href="https://github.com" className="hover:text-primary">GitHub</a></li>
                <li><a href="https://twitter.com" className="hover:text-primary">Twitter</a></li>
                <li><a href="https://discord.com" className="hover:text-primary">Discord</a></li>
                <li><a href="https://t.me" className="hover:text-primary">Telegram</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border text-center text-text-secondary text-sm">
            <p>© 2024 DogCatPaw. All rights reserved.</p>
            <p className="mt-2">Powered by Hyperledger Besu & W3C Verifiable Credentials</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
