"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft, CreditCard, AlertCircle, CheckCircle, Info, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

// Mock cart data
const mockCart = [
  {
    id: '1',
    title: 'Introduction to Web Development',
    instructor: 'Aditya Kumar',
    thumbnail: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    price: 49.99,
    discountPrice: 39.99,
  },
  {
    id: '2',
    title: 'Data Science Masterclass',
    instructor: 'Neha Sharma',
    thumbnail: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    price: 79.99,
    discountPrice: null,
  },
];

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [orderProcessing, setOrderProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  
  // Calculate totals
  const subtotal = mockCart.reduce((acc, item) => acc + (item.discountPrice || item.price), 0);
  const tax = subtotal * 0.05; // 5% tax
  const total = subtotal + tax;
  
  // Handle payment submission
  const handleSubmitPayment = () => {
    setOrderProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setOrderProcessing(false);
      setOrderComplete(true);
      
      toast({
        title: "Payment Successful!",
        description: "Your order has been completed successfully.",
        variant: "default",
      });
    }, 2000);
  };
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };
  
  if (orderComplete) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto bg-green-100 dark:bg-green-900/20 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-700 dark:text-green-400" />
              </div>
              <CardTitle className="text-2xl">Payment Successful!</CardTitle>
              <CardDescription>Your order has been completed successfully</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border border-border rounded-lg p-4">
                <div className="text-muted-foreground mb-2">Order Reference</div>
                <div className="font-bold text-lg">ORD-{Math.floor(100000 + Math.random() * 900000)}</div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium">Order Summary</h3>
                {mockCart.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 py-2">
                    <div className="h-12 w-12 rounded overflow-hidden">
                      <img 
                        src={item.thumbnail} 
                        alt={item.title} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <div className="font-medium">{item.title}</div>
                      <div className="text-sm text-muted-foreground">{item.instructor}</div>
                    </div>
                    <div className="font-medium">
                      {item.discountPrice ? formatCurrency(item.discountPrice) : formatCurrency(item.price)}
                    </div>
                  </div>
                ))}
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax</span>
                    <span>{formatCurrency(tax)}</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>{formatCurrency(total)}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-muted p-4 rounded-lg flex items-start gap-3">
                <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">What happens next?</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    You'll receive an email confirmation shortly. Your purchased courses are now available in your dashboard.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-3">
              <Button 
                variant="outline" 
                className="w-full sm:w-auto"
                asChild
              >
                <Link href="/dashboard">
                  Go to Dashboard
                </Link>
              </Button>
              <Button 
                className="w-full sm:w-auto" 
                asChild
              >
                <Link href="/courses">
                  Browse More Courses
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-start mb-8">
        <Button variant="ghost" asChild>
          <Link href="/cart">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Cart
          </Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Payment Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Checkout</CardTitle>
              <CardDescription>Complete your purchase</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Payment Method Selection */}
              <div>
                <h3 className="text-lg font-medium mb-4">Payment Method</h3>
                <Tabs defaultValue="card" onValueChange={setPaymentMethod}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="card">Credit Card</TabsTrigger>
                    <TabsTrigger value="paypal">PayPal</TabsTrigger>
                    <TabsTrigger value="wallet">Digital Wallet</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="card" className="space-y-4 pt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <Label htmlFor="cardName">Name on Card</Label>
                        <Input id="cardName" placeholder="John Smith" />
                      </div>
                      <div className="col-span-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <div className="relative">
                          <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                          <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input id="expiryDate" placeholder="MM/YY" />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" />
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Lock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Your payment information is secure and encrypted</span>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="paypal" className="pt-4">
                    <div className="text-center p-6 space-y-4">
                      <div className="inline-block mb-2">
                        <svg width="100" height="25" viewBox="0 0 100 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M39.1107 3.27637H32.3339C32.0607 3.27637 31.825 3.47546 31.7874 3.74661L29.7137 16.6868C29.6886 16.8671 29.8305 17.0286 30.0098 17.0286H33.2558C33.529 17.0286 33.7647 16.8295 33.8023 16.5584L34.3332 13.3685C34.3707 13.0974 34.6065 12.8983 34.8797 12.8983H36.9095C40.3701 12.8983 42.4186 11.1323 42.9619 7.85077C43.2038 6.39859 42.9557 5.24755 42.2441 4.45382C41.4572 3.56969 40.1469 3.27637 39.1107 3.27637ZM39.7883 8.02768C39.4839 10.0138 37.9541 10.0138 36.4682 10.0138H35.5447L36.0631 6.8991C36.0882 6.71882 36.2425 6.58302 36.423 6.58302H36.8462C37.8448 6.58302 38.7934 6.58302 39.2865 7.16132C39.5909 7.50143 39.6536 7.68171 39.7883 8.02768Z" fill="#253B80"/>
                          <path d="M56.6516 7.9858H53.3928C53.2123 7.9858 53.058 8.1216 53.0329 8.30188L52.9453 8.80846L52.8138 8.61923C52.2203 7.73509 50.9602 7.46394 49.7001 7.46394C46.5669 7.46394 43.8853 9.8193 43.3671 13.1443C43.0877 14.8102 43.4355 16.401 44.3464 17.4644C45.1834 18.4401 46.3933 18.8428 47.8289 18.8428C50.3727 18.8428 51.7395 17.1957 51.7395 17.1957L51.6519 17.7023C51.6268 17.8826 51.7687 18.0441 51.948 18.0441H54.9195C55.1927 18.0441 55.4284 17.845 55.466 17.5739L56.9478 8.32716C56.9729 8.14688 56.831 7.9858 56.6516 7.9858ZM52.2328 13.2064C51.9599 14.847 50.6244 15.9042 48.9762 15.9042C48.1516 15.9042 47.4899 15.6393 47.0792 15.1515C46.6686 14.6648 46.5308 13.9578 46.6623 13.1443C46.9225 11.5162 48.2832 10.4338 49.9064 10.4338C50.7183 10.4338 51.38 10.6998 51.7958 11.1876C52.2139 11.6877 52.3643 12.3947 52.2328 13.2064Z" fill="#253B80"/>
                          <path d="M73.8081 7.9858H70.5368C70.3311 7.9858 70.1381 8.09631 70.0254 8.26765L66.2895 14.1948L64.7263 8.45688C64.6636 8.1858 64.4153 7.9858 64.1296 7.9858H60.9211C60.7166 7.9858 60.5747 8.18473 60.612 8.38383L63.3313 17.4329L60.7668 21.1501C60.6373 21.3365 60.7668 21.5797 60.9963 21.5797H64.2613C64.465 21.5797 64.658 21.4723 64.7699 21.3031L73.9999 8.40911C74.1284 8.22377 73.9999 7.9858 73.8081 7.9858Z" fill="#253B80"/>
                          <path d="M82.3274 3.27637H75.5506C75.2774 3.27637 75.0417 3.47546 75.0041 3.74661L72.9304 16.6868C72.9053 16.8671 73.0472 17.0286 73.2265 17.0286H76.8108C76.9912 17.0286 77.1456 16.8928 77.1707 16.7125L77.7175 13.3685C77.755 13.0974 77.9908 12.8983 78.264 12.8983H80.2937C83.7544 12.8983 85.8029 11.1323 86.3462 7.85077C86.588 6.39859 86.34 5.24755 85.6284 4.45382C84.8426 3.56969 83.5323 3.27637 82.3274 3.27637ZM83.005 8.02768C82.7006 10.0138 81.1708 10.0138 79.6849 10.0138H78.7614L79.2798 6.8991C79.3049 6.71882 79.4592 6.58302 79.6397 6.58302H80.0629C81.0615 6.58302 82.0101 6.58302 82.5032 7.16132C82.8076 7.50143 82.8703 7.68171 83.005 8.02768Z" fill="#179BD7"/>
                          <path d="M99.8683 7.9858H96.6095C96.429 7.9858 96.2747 8.1216 96.2496 8.30188L96.162 8.80846L96.0305 8.61923C95.437 7.73509 94.1769 7.46394 92.9168 7.46394C89.7836 7.46394 87.102 9.8193 86.5838 13.1443C86.3044 14.8102 86.6522 16.401 87.5631 17.4644C88.4001 18.4401 89.61 18.8428 91.0456 18.8428C93.5894 18.8428 94.9562 17.1957 94.9562 17.1957L94.8686 17.7023C94.8435 17.8826 94.9854 18.0441 95.1647 18.0441H98.1362C98.4094 18.0441 98.6451 17.845 98.6827 17.5739L100.166 8.32716C100.188 8.14688 100.048 7.9858 99.8683 7.9858ZM95.4495 13.2064C95.1766 14.847 93.8411 15.9042 92.1929 15.9042C91.3683 15.9042 90.7066 15.6393 90.2959 15.1515C89.8853 14.6648 89.7475 13.9578 89.879 13.1443C90.1392 11.5162 91.4999 10.4338 93.1231 10.4338C93.935 10.4338 94.5967 10.6998 95.0125 11.1876C95.4306 11.6877 95.581 12.3947 95.4495 13.2064Z" fill="#179BD7"/>
                          <path d="M18.3117 3.27637H11.5349C11.2617 3.27637 11.026 3.47546 10.9884 3.74661L8.91472 16.6868C8.88962 16.8671 9.03152 17.0286 9.21087 17.0286H12.5575C12.8307 17.0286 13.0664 16.8295 13.104 16.5584L13.6349 13.3685C13.6724 13.0974 13.9082 12.8983 14.1814 12.8983H16.2112C19.6718 12.8983 21.7203 11.1323 22.2636 7.85077C22.5055 6.39859 22.2574 5.24755 21.5458 4.45382C20.7589 3.56969 19.4486 3.27637 18.3117 3.27637ZM18.9893 8.02768C18.6849 10.0138 17.1551 10.0138 15.6692 10.0138H14.7457L15.2641 6.8991C15.2892 6.71882 15.4435 6.58302 15.624 6.58302H16.0472C17.0458 6.58302 17.9944 6.58302 18.4875 7.16132C18.7919 7.50143 18.8546 7.68171 18.9893 8.02768Z" fill="#179BD7"/>
                          <path d="M35.8526 7.9858H32.5938C32.4133 7.9858 32.259 8.1216 32.2339 8.30188L32.1463 8.80846L32.0148 8.61923C31.4213 7.73509 30.1612 7.46394 28.9011 7.46394C25.7679 7.46394 23.0863 9.8193 22.5681 13.1443C22.2887 14.8102 22.6365 16.401 23.5474 17.4644C24.3844 18.4401 25.5943 18.8428 27.0299 18.8428C29.5737 18.8428 30.9405 17.1957 30.9405 17.1957L30.8529 17.7023C30.8278 17.8826 30.9697 18.0441 31.149 18.0441H34.1205C34.3937 18.0441 34.6294 17.845 34.667 17.5739L36.1488 8.32716C36.1739 8.14688 36.032 7.9858 35.8526 7.9858ZM31.4338 13.2064C31.1609 14.847 29.8254 15.9042 28.1772 15.9042C27.3526 15.9042 26.6909 15.6393 26.2802 15.1515C25.8696 14.6648 25.7318 13.9578 25.8633 13.1443C26.1235 11.5162 27.4842 10.4338 29.1074 10.4338C29.9193 10.4338 30.581 10.6998 30.9968 11.1876C31.4149 11.6877 31.5653 12.3947 31.4338 13.2064Z" fill="#179BD7"/>
                          <path d="M6.6134 18.0441H3.65891C3.47956 18.0441 3.33873 17.8826 3.36277 17.7023L5.44387 4.75819C5.46897 4.57791 5.62316 4.44211 5.80251 4.44211H8.757C8.93635 4.44211 9.07718 4.60367 9.05314 4.78395L6.97204 17.728C6.94588 17.9083 6.79275 18.0441 6.6134 18.0441Z" fill="#253B80"/>
                          <path d="M3.40838 19.3333C3.28263 20.0403 3.77579 20.6409 4.48666 20.6409H6.61346C6.82362 20.6409 7.0071 20.4923 7.03645 20.2824L7.23431 19.0126C7.26366 18.8026 7.44615 18.654 7.65632 18.654H8.65072C11.3635 18.654 13.0117 17.2692 13.4181 14.6521C13.5968 13.5443 13.4768 12.6299 13.0619 11.9543C12.6219 11.242 11.8288 10.8828 10.7294 10.8828H7.1551C6.92467 10.8828 6.72174 11.0693 6.68825 11.2996L5.6771 19.0126C5.64775 19.2225 5.46419 19.3711 5.2551 19.3711H3.59611C3.50326 19.3711 3.42481 19.3585 3.40838 19.3333Z" fill="white"/>
                          <path d="M6.84822 13.2926C6.90626 12.9357 7.22112 12.6994 7.58173 12.6994H10.2175C10.5781 12.6994 10.893 12.9357 10.951 13.2926C11.0091 13.6495 10.7793 13.9966 10.4187 13.9966H7.78291C7.4223 13.9966 7.10744 13.6495 7.16548 13.2926H6.84822Z" fill="black" fillOpacity="0.15"/>
                        </svg>
                      </div>
                      <p className="text-muted-foreground mb-4">
                        Click the button below to continue to PayPal for secure payment.
                      </p>
                      <Button className="w-full">Continue to PayPal</Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="wallet" className="pt-4">
                    <div className="space-y-4">
                      <RadioGroup defaultValue="apple">
                        <div className="flex items-center space-x-2 p-3 border border-border rounded-md">
                          <RadioGroupItem value="apple" id="apple" />
                          <Label htmlFor="apple" className="flex-grow cursor-pointer">
                            <div className="flex items-center">
                              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.9901 4.0797C13.0898 4.0797 12.4066 4.3957 11.8927 4.6968C11.4472 4.9563 11.0918 4.9563 10.6463 4.6968C10.1324 4.3957 9.44917 4.0797 8.54888 4.0797C6.65225 4.0797 4.58398 5.75173 4.58398 8.64968C4.58398 11.5326 6.32659 14.6414 8.21927 14.6414C8.9873 14.6414 9.48565 14.3249 9.98204 14.0083C10.4275 13.7233 10.8728 13.4382 11.5578 13.4382C12.2427 13.4382 12.688 13.7233 13.1335 14.0083C13.6299 14.3249 14.1282 14.6414 14.8963 14.6414C16.789 14.6414 18.5316 11.5326 18.5316 8.64968C18.5316 5.75173 16.4633 4.0797 14.5667 4.0797H13.9901Z" fill="black"/>
                                <path d="M13.2466 1.25C12.7877 1.25 12.0545 1.51613 11.5574 2.01452C11.0604 2.51087 10.7943 3.24395 10.8588 3.93508C11.3558 3.93508 12.1535 3.66895 12.6505 3.17056C13.1476 2.67218 13.3759 1.94113 13.3759 1.25H13.2466Z" fill="black"/>
                              </svg>
                              <span className="ml-2">Apple Pay</span>
                            </div>
                          </Label>
                        </div>
                        
                        <div className="flex items-center space-x-2 p-3 border border-border rounded-md">
                          <RadioGroupItem value="google" id="google" />
                          <Label htmlFor="google" className="flex-grow cursor-pointer">
                            <div className="flex items-center">
                              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18.5687 10.27C18.5687 9.53 18.5021 8.97 18.3562 8.39H10.1895V11.56H14.9603C14.8395 12.33 14.3166 13.48 13.1729 14.25L13.1536 14.3773L15.7427 16.3637L15.9208 16.38C17.4291 14.99 18.5687 12.83 18.5687 10.27Z" fill="#4285F4"/>
                                <path d="M10.1896 18.8299C12.5126 18.8299 14.4584 18.0399 15.9209 16.3799L13.173 14.2499C12.4457 14.74 11.4584 15.07 10.1896 15.07C7.91038 15.07 5.99788 13.59 5.25517 11.56L5.13351 11.5685L2.42371 13.6305L2.36938 13.7499C3.82204 16.7799 6.75726 18.8299 10.1896 18.8299Z" fill="#34A853"/>
                                <path d="M5.25521 11.56C5.0636 10.98 4.94787 10.35 4.94787 9.70002C4.94787 9.05002 5.0636 8.42002 5.24183 7.84002L5.23438 7.69897L2.48233 5.59864L2.36943 5.65002C1.82892 6.85002 1.51562 8.20002 1.51562 9.70002C1.51562 11.2 1.82892 12.55 2.36943 13.75L5.25521 11.56Z" fill="#FBBC05"/>
                                <path d="M10.1896 4.33C11.7979 4.33 12.8854 5.05 13.5085 5.64L15.9834 3.25C14.4542 1.83 12.5126 1 10.1896 1C6.75726 1 3.82204 3.05 2.36938 6.08L5.24178 8.27C5.99788 6.24 7.91038 4.33 10.1896 4.33Z" fill="#EB4335"/>
                              </svg>
                              <span className="ml-2">Google Pay</span>
                            </div>
                          </Label>
                        </div>
                      </RadioGroup>
                      
                      <Button className="w-full">Pay with Digital Wallet</Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              
              {/* Billing Information */}
              <div>
                <h3 className="text-lg font-medium mb-4">Billing Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" />
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" />
                  </div>
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Select defaultValue="us">
                      <SelectTrigger>
                        <SelectValue placeholder="Select a country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="ca">Canada</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="in">India</SelectItem>
                        <SelectItem value="au">Australia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="state">State/Province</Label>
                    <Input id="state" />
                  </div>
                  <div>
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input id="postalCode" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full"
                onClick={handleSubmitPayment}
                disabled={orderProcessing}
              >
                {orderProcessing ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white\" xmlns="http://www.w3.org/2000/svg\" fill="none\" viewBox="0 0 24 24">
                      <circle className="opacity-25\" cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing Payment...
                  </>
                ) : (
                  <>Complete Payment {formatCurrency(total)}</>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        {/* Order Summary */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
              <CardDescription>Review your order details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Item List */}
              {mockCart.map((item) => (
                <div key={item.id} className="flex items-start space-x-4">
                  <div className="h-16 w-16 rounded overflow-hidden">
                    <img 
                      src={item.thumbnail} 
                      alt={item.title} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="font-medium">{item.title}</div>
                    <div className="text-sm text-muted-foreground">{item.instructor}</div>
                    <div className="mt-1">
                      {item.discountPrice ? (
                        <div className="flex items-center">
                          <span className="font-medium">{formatCurrency(item.discountPrice)}</span>
                          <span className="text-sm text-muted-foreground line-through ml-2">
                            {formatCurrency(item.price)}
                          </span>
                          <Badge className="ml-2 text-xs bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-800">
                            {Math.round(((item.price - item.discountPrice) / item.price) * 100)}% OFF
                          </Badge>
                        </div>
                      ) : (
                        <span className="font-medium">{formatCurrency(item.price)}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              <Separator />
              
              {/* Price Breakdown */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>{formatCurrency(tax)}</span>
                </div>
                <div className="flex justify-between pt-2 font-bold">
                  <span>Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>
              
              <Separator />
              
              {/* Promotional Code */}
              <div>
                <Label htmlFor="promoCode">Have a promotional code?</Label>
                <div className="flex mt-1">
                  <Input id="promoCode" className="rounded-r-none" placeholder="Enter code" />
                  <Button variant="secondary" className="rounded-l-none">Apply</Button>
                </div>
              </div>
              
              {/* Security Info */}
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <div className="flex items-center">
                  <Lock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm font-medium">Secure Checkout</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Your payment information is encrypted and secure. We do not store your credit card details.
                </p>
              </div>
              
              {/* Refund Policy */}
              <div className="flex items-start space-x-2">
                <AlertCircle className="h-4 w-4 text-muted-foreground mt-0.5" />
                <p className="text-xs text-muted-foreground">
                  30-day money-back guarantee. If you're not satisfied with your purchase, we'll provide a full refund.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}