'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Menu, X, Heart, User, Phone, ChevronDown, Home, MapPin, Building, Building2, Briefcase, Wheat, Settings, FileText, Search, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { data: session, status } = useSession();

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-900 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">SL</span>
            </div>
            <span className="text-2xl font-bold text-blue-900">Beti</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('achat')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
             <button className="flex items-center text-gray-700 hover:text-blue-900 font-medium transition-colors py-6">
                Acheter
                <ChevronDown className="w-4 h-4 ml-1" />
              </button>
            </div>
            
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('location')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
             <button className="flex items-center text-gray-700 hover:text-blue-900 font-medium transition-colors py-6">
                Louer
                <ChevronDown className="w-4 h-4 ml-1" />
              </button>
            </div>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button asChild variant="outline" size="sm" className="text-blue-900 border-blue-900 hover:bg-blue-50">
              <Link href="/deposer-une-annonce">
                Déposer une annonce
              </Link>
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-700 hover:text-blue-900">
              <Heart className="w-4 h-4 mr-2" />
            </Button>
            
            {session?.user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="relative h-10 w-10 rounded-full bg-blue-100 hover:bg-blue-200">
                    <div className="flex items-center justify-center w-full h-full">
                      {session.user.avatar ? (
                        <img 
                          src={session.user.avatar} 
                          alt={`${session.user.firstName} ${session.user.lastName}`}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-blue-900 font-semibold text-sm">
                          {session.user.firstName?.[0]}{session.user.lastName?.[0]}
                        </span>
                      )}
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium text-sm text-gray-900">
                        {session.user.firstName} {session.user.lastName}
                      </p>
                      <p className="text-xs text-gray-600">
                        {session.user.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/mon-compte" className="flex items-center cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Mon compte</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/mes-annonces" className="flex items-center cursor-pointer">
                      <FileText className="mr-2 h-4 w-4" />
                      <span>Mes annonces</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/favorites" className="flex items-center cursor-pointer">
                      <Heart className="mr-2 h-4 w-4" />
                      <span>Mes favoris</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/saved-searches" className="flex items-center cursor-pointer">
                      <Search className="mr-2 h-4 w-4" />
                      <span>Mes recherches sauvegardées</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="flex items-center cursor-pointer text-red-600 focus:text-red-600"
                    onClick={handleSignOut}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Déconnexion</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild size="sm" className="bg-blue-900 hover:bg-blue-800">
                <Link href="/auth/signin">
                  <User className="w-4 h-4 mr-2" />
                  Se Connecter
                </Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
      {/* Full-width Dropdown Menus */}
      {activeDropdown === 'achat' && (
        <div 
         className="absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-lg z-50"
          onMouseEnter={() => setActiveDropdown('achat')}
          onMouseLeave={() => setActiveDropdown(null)}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              <Link 
                href="/properties?type=maison&transaction=achat"
                className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors group"
               onClick={() => setActiveDropdown(null)}
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-blue-200 transition-colors">
                  <Home className="w-6 h-6 text-blue-900" />
                </div>
                <span className="font-medium text-gray-900 group-hover:text-blue-900">Maison</span>
                <span className="text-sm text-gray-500 mt-1">Acheter une maison</span>
              </Link>
              
              <Link 
                href="/properties?type=terrain&transaction=achat"
                className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors group"
               onClick={() => setActiveDropdown(null)}
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-blue-200 transition-colors">
                  <MapPin className="w-6 h-6 text-blue-900" />
                </div>
                <span className="font-medium text-gray-900 group-hover:text-blue-900">Terrain</span>
                <span className="text-sm text-gray-500 mt-1">Acheter un terrain</span>
              </Link>
              
              <Link 
                href="/properties?type=villa&transaction=achat"
                className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors group"
               onClick={() => setActiveDropdown(null)}
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-blue-200 transition-colors">
                  <Building2 className="w-6 h-6 text-blue-900" />
                </div>
                <span className="font-medium text-gray-900 group-hover:text-blue-900">Villa</span>
                <span className="text-sm text-gray-500 mt-1">Acheter une villa</span>
              </Link>
              
              <Link 
                href="/properties?type=immeuble&transaction=achat"
                className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors group"
               onClick={() => setActiveDropdown(null)}
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-blue-200 transition-colors">
                  <Building className="w-6 h-6 text-blue-900" />
                </div>
                <span className="font-medium text-gray-900 group-hover:text-blue-900">Immeuble</span>
                <span className="text-sm text-gray-500 mt-1">Acheter un immeuble</span>
              </Link>
              
              <Link 
                href="/properties?type=bureau_commerce&transaction=achat"
                className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors group"
               onClick={() => setActiveDropdown(null)}
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-blue-200 transition-colors">
                  <Briefcase className="w-6 h-6 text-blue-900" />
                </div>
                <span className="font-medium text-gray-900 group-hover:text-blue-900">Bureaux & Commerces</span>
                <span className="text-sm text-gray-500 mt-1">Acheter un local</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {activeDropdown === 'location' && (
        <div 
         className="absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-lg z-50"
          onMouseEnter={() => setActiveDropdown('location')}
          onMouseLeave={() => setActiveDropdown(null)}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              <Link 
                href="/properties?type=appartement&transaction=location"
                className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors group"
               onClick={() => setActiveDropdown(null)}
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-blue-200 transition-colors">
                  <Building className="w-6 h-6 text-blue-900" />
                </div>
                <span className="font-medium text-gray-900 group-hover:text-blue-900">Appartement</span>
                <span className="text-sm text-gray-500 mt-1">Louer un appartement</span>
              </Link>
              
              <Link 
                href="/properties?type=maison&transaction=location"
                className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors group"
               onClick={() => setActiveDropdown(null)}
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-blue-200 transition-colors">
                  <Home className="w-6 h-6 text-blue-900" />
                </div>
                <span className="font-medium text-gray-900 group-hover:text-blue-900">Maison</span>
                <span className="text-sm text-gray-500 mt-1">Louer une maison</span>
              </Link>
              
              <Link 
                href="/properties?type=villa&transaction=location"
                className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors group"
               onClick={() => setActiveDropdown(null)}
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-blue-200 transition-colors">
                  <Building2 className="w-6 h-6 text-blue-900" />
                </div>
                <span className="font-medium text-gray-900 group-hover:text-blue-900">Villa</span>
                <span className="text-sm text-gray-500 mt-1">Louer une villa</span>
              </Link>
              
              <Link 
                href="/properties?type=immeuble&transaction=location"
                className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors group"
               onClick={() => setActiveDropdown(null)}
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-blue-200 transition-colors">
                  <Building className="w-6 h-6 text-blue-900" />
                </div>
                <span className="font-medium text-gray-900 group-hover:text-blue-900">Immeuble</span>
                <span className="text-sm text-gray-500 mt-1">Louer un immeuble</span>
              </Link>
              
              <Link 
                href="/properties?type=bureau_commerce&transaction=location"
                className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors group"
               onClick={() => setActiveDropdown(null)}
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-blue-200 transition-colors">
                  <Briefcase className="w-6 h-6 text-blue-900" />
                </div>
                <span className="font-medium text-gray-900 group-hover:text-blue-900">Bureaux & Commerces</span>
                <span className="text-sm text-gray-500 mt-1">Louer un local</span>
              </Link>
              
              <Link 
                href="/properties?type=terrain&transaction=location"
                className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors group"
               onClick={() => setActiveDropdown(null)}
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-blue-200 transition-colors">
                  <Wheat className="w-6 h-6 text-blue-900" />
                </div>
                <span className="font-medium text-gray-900 group-hover:text-blue-900">Terrain agricole</span>
                <span className="text-sm text-gray-500 mt-1">Louer un terrain</span>
              </Link>
            </div>
          </div>
        </div>
      )}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <div className="space-y-2">
                <div className="text-gray-700 font-medium">Acheter</div>
                <div className="pl-4 space-y-2">
                  <Link href="/properties?type=maison&transaction=achat" className="block text-gray-600 hover:text-blue-900">
                    Maison
                  </Link>
                  <Link href="/properties?type=terrain&transaction=achat" className="block text-gray-600 hover:text-blue-900">
                    Terrain
                  </Link>
                  <Link href="/properties?type=villa&transaction=achat" className="block text-gray-600 hover:text-blue-900">
                    Villa
                  </Link>
                  <Link href="/properties?type=immeuble&transaction=achat" className="block text-gray-600 hover:text-blue-900">
                    Immeuble
                  </Link>
                  <Link href="/properties?type=bureau_commerce&transaction=achat" className="block text-gray-600 hover:text-blue-900">
                    Bureaux & Commerces
                  </Link>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-gray-700 font-medium">Louer</div>
                <div className="pl-4 space-y-2">
                  <Link href="/properties?type=appartement&transaction=location" className="block text-gray-600 hover:text-blue-900">
                    Appartement
                  </Link>
                  <Link href="/properties?type=maison&transaction=location" className="block text-gray-600 hover:text-blue-900">
                    Maison
                  </Link>
                  <Link href="/properties?type=villa&transaction=location" className="block text-gray-600 hover:text-blue-900">
                    Villa
                  </Link>
                  <Link href="/properties?type=immeuble&transaction=location" className="block text-gray-600 hover:text-blue-900">
                    Immeuble
                  </Link>
                  <Link href="/properties?type=bureau_commerce&transaction=location" className="block text-gray-600 hover:text-blue-900">
                    Bureaux & Commerces
                  </Link>
                  <Link href="/properties?type=terrain&transaction=location" className="block text-gray-600 hover:text-blue-900">
                    Terrain agricole
                  </Link>
                </div>
              </div>
              <hr className="border-gray-200" />
              <div className="flex flex-col space-y-2">
                <Button variant="ghost" size="sm" className="justify-start">
                  <Heart className="w-4 h-4 mr-2" />
                  Favoris
                </Button>
                <Button variant="ghost" size="sm" className="justify-start">
                  <Phone className="w-4 h-4 mr-2" />
                  Contact
                </Button>
                
                {session?.user ? (
                  <div className="space-y-2">
                    <div className="text-sm text-gray-700 px-3 py-2">
                      Bonjour, {session.user.firstName}
                    </div>
                    <Link href="/mon-compte" className="flex items-center px-3 py-2 text-gray-700 hover:text-blue-900">
                      <Settings className="w-4 h-4 mr-2" />
                      Mon compte
                    </Link>
                    <Link href="/mes-annonces" className="flex items-center px-3 py-2 text-gray-700 hover:text-blue-900">
                      <FileText className="w-4 h-4 mr-2" />
                      Mes annonces
                    </Link>
                    <Link href="/favorites" className="flex items-center px-3 py-2 text-gray-700 hover:text-blue-900">
                      <Heart className="w-4 h-4 mr-2" />
                      Mes favoris
                    </Link>
                    <Link href="/saved-searches" className="flex items-center px-3 py-2 text-gray-700 hover:text-blue-900">
                      <Search className="w-4 h-4 mr-2" />
                      Mes recherches sauvegardées
                    </Link>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleSignOut}
                      className="w-full justify-start text-red-600 hover:text-red-600"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      <span>Déconnexion</span>
                    </Button>
                  </div>
                ) : (
                  <Button asChild size="sm" className="bg-blue-900 hover:bg-blue-800">
                    <Link href="/auth/signin">
                      <User className="w-4 h-4 mr-2" />
                      Se Connecter
                    </Link>
                  </Button>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}