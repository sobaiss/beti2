'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Upload, MapPin, Home, Euro, Camera, FileText, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Header from '@/components/Header';

export default function DepositListingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [propertyType, setPropertyType] = useState('');
  const [transactionType, setTransactionType] = useState('');
  const [openCity, setOpenCity] = useState(false);
  const [openLocation, setOpenLocation] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    address: '',
    postalCode: '',
    city: '',
    area: '',
    rooms: '',
    bedrooms: '',
    bathrooms: '',
    floor: '',
    totalFloors: '',
    yearBuilt: '',
    energyRating: '',
    furnished: false,
    balcony: false,
    terrace: false,
    garden: false,
    parking: false,
    elevator: false,
    cellar: false,
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    isAgent: false
  });

  // Sample data for cities and locations in Chad
  const cities = [
    'N\'Djamena',
    'Moundou',
    'Sarh',
    'Abéché',
    'Kelo',
    'Koumra',
    'Pala',
    'Am Timan',
    'Bongor',
    'Mongo',
    'Doba',
    'Ati',
    'Laï',
    'Biltine',
    'Moïssala'
  ];

  const locations = [
    // N'Djamena neighborhoods
    'Chagoua',
    'Moursal',
    'Farcha',
    'Klemat',
    'Diguel',
    'Kabalaye',
    'Gassi',
    'Ridina',
    'Madjorio',
    'Gardolé',
    'Amriguébé',
    'Walia',
    'Sabangali',
    'Dembé',
    'Goudji',
    // Other areas
    'Centre-ville',
    'Zone industrielle',
    'Zone résidentielle',
    'Quartier administratif',
    'Zone commerciale'
  ];
  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      router.push('/auth/signin?callbackUrl=/deposer-une-annonce');
      return;
    }
  }, [session, status, router]);

  const steps = [
    { id: 1, title: 'Type de bien', icon: Home },
    { id: 2, title: 'Localisation', icon: MapPin },
    { id: 3, title: 'Caractéristiques', icon: FileText },
    { id: 4, title: 'Prix', icon: Euro },
    { id: 5, title: 'Photos', icon: Camera },
    { id: 6, title: 'Contact', icon: Check }
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Quel type de bien souhaitez-vous mettre en ligne ?</h2>
              <p className="text-gray-600 mb-6">Sélectionnez le type de transaction et le type de bien</p>
            </div>

            <div className="space-y-6">
              <div>
                <Label className="text-base font-medium text-gray-900 mb-4 block">Type de transaction</Label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setTransactionType('achat')}
                    className={`p-6 border-2 rounded-lg text-left transition-all ${
                      transactionType === 'achat' 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-semibold text-lg mb-2">Vendre</div>
                    <div className="text-gray-600">Je souhaite vendre mon bien</div>
                  </button>
                  <button
                    onClick={() => setTransactionType('location')}
                    className={`p-6 border-2 rounded-lg text-left transition-all ${
                      transactionType === 'location' 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-semibold text-lg mb-2">Louer</div>
                    <div className="text-gray-600">Je souhaite louer mon bien</div>
                  </button>
                </div>
              </div>

              <div>
                <Label className="text-base font-medium text-gray-900 mb-4 block">Type de bien</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { value: 'appartement', label: 'Appartement', icon: '🏢' },
                    { value: 'maison', label: 'Maison', icon: '🏠' },
                    { value: 'villa', label: 'Villa', icon: '🏡' },
                    { value: 'terrain', label: 'Terrain', icon: '⛰️' },
                    { value: 'bureau_commerce', label: 'Bureau/Commerce', icon: '🏪' }
                  ].map((type) => (
                    <button
                      key={type.value}
                      onClick={() => setPropertyType(type.value)}
                      className={`p-4 border-2 rounded-lg text-center transition-all ${
                        propertyType === type.value 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-2xl mb-2">{type.icon}</div>
                      <div className="font-medium">{type.label}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Où se situe votre bien ?</h2>
              <p className="text-gray-600 mb-6">Indiquez l'adresse complète de votre propriété</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="address">Adresse complète</Label>
                <Input
                  id="address"
                  placeholder="Numéro et nom de rue"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="postalCode">Code postal</Label>
                  <Input
                    id="postalCode"
                    placeholder="75001"
                    value={formData.postalCode}
                    onChange={(e) => handleInputChange('postalCode', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Ville</Label>
                  <Popover open={openCity} onOpenChange={setOpenCity}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openCity}
                        className="w-full justify-between"
                      >
                        {formData.city || "Sélectionner une ville..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Rechercher une ville..." />
                        <CommandList>
                          <CommandEmpty>Aucune ville trouvée.</CommandEmpty>
                          <CommandGroup>
                            {cities.map((city) => (
                              <CommandItem
                                key={city}
                                value={city}
                                onSelect={(currentValue) => {
                                  handleInputChange('city', currentValue === formData.city ? '' : currentValue);
                                  setOpenCity(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    formData.city === city ? "opacity-100" : "opacity-0"
                                  )}
                                />
                                {city}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div>
                <Label>Quartier / Secteur (optionnel)</Label>
                <Popover open={openLocation} onOpenChange={setOpenLocation}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openLocation}
                      className="w-full justify-between"
                    >
                      {formData.location || "Sélectionner un quartier..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Rechercher un quartier..." />
                      <CommandList>
                        <CommandEmpty>Aucun quartier trouvé.</CommandEmpty>
                        <CommandGroup>
                          {locations.map((location) => (
                            <CommandItem
                              key={location}
                              value={location}
                              onSelect={(currentValue) => {
                                handleInputChange('location', currentValue === formData.location ? '' : currentValue);
                                setOpenLocation(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  formData.location === location ? "opacity-100" : "opacity-0"
                                )}
                              />
                              {location}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Caractéristiques du bien</h2>
              <p className="text-gray-600 mb-6">Décrivez les principales caractéristiques de votre bien</p>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="area">Surface (m²)</Label>
                  <Input
                    id="area"
                    type="number"
                    placeholder="85"
                    value={formData.area}
                    onChange={(e) => handleInputChange('area', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="rooms">Nombre de pièces</Label>
                  <Select value={formData.rooms} onValueChange={(value) => handleInputChange('rooms', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 pièce</SelectItem>
                      <SelectItem value="2">2 pièces</SelectItem>
                      <SelectItem value="3">3 pièces</SelectItem>
                      <SelectItem value="4">4 pièces</SelectItem>
                      <SelectItem value="5">5 pièces</SelectItem>
                      <SelectItem value="6+">6+ pièces</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="bedrooms">Chambres</Label>
                  <Select value={formData.bedrooms} onValueChange={(value) => handleInputChange('bedrooms', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">0 chambre</SelectItem>
                      <SelectItem value="1">1 chambre</SelectItem>
                      <SelectItem value="2">2 chambres</SelectItem>
                      <SelectItem value="3">3 chambres</SelectItem>
                      <SelectItem value="4">4 chambres</SelectItem>
                      <SelectItem value="5+">5+ chambres</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="bathrooms">Salles de bain</Label>
                  <Select value={formData.bathrooms} onValueChange={(value) => handleInputChange('bathrooms', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 salle de bain</SelectItem>
                      <SelectItem value="2">2 salles de bain</SelectItem>
                      <SelectItem value="3">3 salles de bain</SelectItem>
                      <SelectItem value="4+">4+ salles de bain</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="floor">Étage</Label>
                  <Input
                    id="floor"
                    placeholder="2"
                    value={formData.floor}
                    onChange={(e) => handleInputChange('floor', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="yearBuilt">Année de construction</Label>
                  <Input
                    id="yearBuilt"
                    type="number"
                    placeholder="2010"
                    value={formData.yearBuilt}
                    onChange={(e) => handleInputChange('yearBuilt', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label className="text-base font-medium text-gray-900 mb-4 block">Équipements et caractéristiques</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { key: 'furnished', label: 'Meublé' },
                    { key: 'balcony', label: 'Balcon' },
                    { key: 'terrace', label: 'Terrasse' },
                    { key: 'garden', label: 'Jardin' },
                    { key: 'parking', label: 'Parking' },
                    { key: 'elevator', label: 'Ascenseur' },
                    { key: 'cellar', label: 'Cave' }
                  ].map((item) => (
                    <div key={item.key} className="flex items-center space-x-2">
                      <Checkbox
                        id={item.key}
                        checked={formData[item.key as keyof typeof formData] as boolean}
                        onCheckedChange={(checked) => handleInputChange(item.key, checked as boolean)}
                      />
                      <Label htmlFor={item.key}>{item.label}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description du bien</Label>
                <Textarea
                  id="description"
                  placeholder="Décrivez votre bien, ses atouts, son environnement..."
                  rows={6}
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Quel est le prix de votre bien ?</h2>
              <p className="text-gray-600 mb-6">
                {transactionType === 'achat' 
                  ? 'Indiquez le prix de vente souhaité' 
                  : 'Indiquez le loyer mensuel souhaité'
                }
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="price" className="text-lg font-medium">
                  {transactionType === 'achat' ? 'Prix de vente' : 'Loyer mensuel'}
                </Label>
                <div className="relative mt-2">
                  <Input
                    id="price"
                    type="number"
                    placeholder={transactionType === 'achat' ? '450000' : '1200'}
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    className="text-xl py-4 pr-12"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                    €{transactionType === 'location' ? '/mois' : ''}
                  </div>
                </div>
              </div>

              {transactionType === 'location' && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-900 mb-2">Charges et frais supplémentaires</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="charges" />
                      <Label htmlFor="charges">Charges comprises dans le loyer</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="deposit" />
                      <Label htmlFor="deposit">Dépôt de garantie demandé</Label>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Estimation automatique</h3>
                <p className="text-sm text-gray-600">
                  Basée sur les biens similaires dans votre secteur, nous estimons votre bien entre{' '}
                  <span className="font-medium text-blue-900">
                    {transactionType === 'achat' ? '420 000€ et 480 000€' : '1 100€ et 1 400€/mois'}
                  </span>
                </p>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Ajoutez des photos de votre bien</h2>
              <p className="text-gray-600 mb-6">Les annonces avec photos reçoivent 5 fois plus de contacts</p>
            </div>

            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Glissez vos photos ici</h3>
                <p className="text-gray-600 mb-4">ou cliquez pour sélectionner des fichiers</p>
                <Button variant="outline">Choisir des photos</Button>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium text-blue-900 mb-2">Conseils pour de belles photos</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Prenez des photos en haute résolution</li>
                  <li>• Privilégiez la lumière naturelle</li>
                  <li>• Montrez toutes les pièces principales</li>
                  <li>• Incluez des vues extérieures si possible</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Vos informations de contact</h2>
              <p className="text-gray-600 mb-6">Ces informations seront visibles par les personnes intéressées</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <Checkbox
                  id="isAgent"
                  checked={formData.isAgent}
                  onCheckedChange={(checked) => handleInputChange('isAgent', checked as boolean)}
                />
                <Label htmlFor="isAgent">Je suis un professionnel de l'immobilier</Label>
              </div>

              <div>
                <Label htmlFor="contactName">Nom complet</Label>
                <Input
                  id="contactName"
                  placeholder="Jean Dupont"
                  value={formData.contactName}
                  onChange={(e) => handleInputChange('contactName', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="contactEmail">Adresse email</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  placeholder="jean.dupont@email.com"
                  value={formData.contactEmail}
                  onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="contactPhone">Numéro de téléphone</Label>
                <Input
                  id="contactPhone"
                  type="tel"
                  placeholder="06 12 34 56 78"
                  value={formData.contactPhone}
                  onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                />
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-medium text-green-900 mb-2">Votre annonce est prête !</h3>
                <p className="text-sm text-green-800">
                  Elle sera mise en ligne après validation par notre équipe (sous 24h).
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Show loading while checking authentication
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  // Don't render if not authenticated (will redirect)
  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-blue-900 hover:text-blue-800 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à l'accueil
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Déposer une annonce</h1>
          <p className="text-gray-600 mt-2">Vendez ou louez votre bien rapidement et facilement</p>
        </div>

        {/* Progress Steps */}
        {/* Main Content with Sidebar */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Progress Steps */}
          <div className="lg:w-80 flex-shrink-0">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Étapes</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <div className="space-y-4">
                  {steps.map((step, index) => {
                    const Icon = step.icon;
                    const isActive = currentStep === step.id;
                    const isCompleted = currentStep > step.id;
                    
                    return (
                      <div key={step.id} className="flex items-center">
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 flex-shrink-0 ${
                          isCompleted 
                            ? 'bg-green-500 border-green-500 text-white' 
                            : isActive 
                              ? 'bg-blue-500 border-blue-500 text-white' 
                              : 'border-gray-300 text-gray-400'
                        }`}>
                          {isCompleted ? (
                            <Check className="w-5 h-5" />
                          ) : (
                            <Icon className="w-5 h-5" />
                          )}
                        </div>
                        <div className="ml-4 flex-1">
                          <div className={`text-sm font-medium ${
                            isActive ? 'text-blue-900' : isCompleted ? 'text-green-700' : 'text-gray-500'
                          }`}>
                            Étape {step.id}
                          </div>
                          <div className={`text-sm ${
                            isActive ? 'text-blue-700' : isCompleted ? 'text-green-600' : 'text-gray-400'
                          }`}>
                            {step.title}
                          </div>
                        </div>
                        {index < steps.length - 1 && (
                          <div className={`absolute left-[1.25rem] mt-12 w-0.5 h-8 ${
                            isCompleted ? 'bg-green-500' : 'bg-gray-300'
                          }`} style={{ top: `${(index + 1) * 4.5}rem` }} />
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Step Content */}
            <Card className="mb-8">
              <CardContent className="p-8">
                {renderStepContent()}
              </CardContent>
            </Card>

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="px-8"
              >
                Précédent
              </Button>
              
              {currentStep === steps.length ? (
                <Button className="px-8 bg-green-600 hover:bg-green-700">
                  Publier l'annonce
                </Button>
              ) : (
                <Button
                  onClick={nextStep}
                  disabled={
                    (currentStep === 1 && (!propertyType || !transactionType)) ||
                    (currentStep === 2 && (!formData.address || !formData.postalCode || !formData.city)) ||
                    (currentStep === 4 && !formData.price) ||
                    (currentStep === 6 && (!formData.contactName || !formData.contactEmail || !formData.contactPhone))
                  }
                  className="px-8 bg-blue-900 hover:bg-blue-800"
                >
                  Suivant
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}