import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { ROUTES, UserRole, USER_ROLES } from '@/lib/constants';
import { cn } from '@/lib/utils';

const Register = () => {
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<UserRole>(USER_ROLES.VOLUNTEER);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    orgName: '',
    regNumber: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      // TODO: Implement registration logic
      console.log('Register:', { ...formData, role: selectedRole });
    }
  };

  const isStep1Valid = formData.name && formData.email && formData.password && formData.confirmPassword && formData.password === formData.confirmPassword;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary mb-4">
            <span className="text-2xl font-bold text-primary-foreground">NC</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Create Account</h1>
          <p className="text-muted-foreground">Join us in making a difference</p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-6 gap-2">
          <div className={cn(
            'flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium',
            step >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
          )}>
            {step > 1 ? <CheckCircle2 className="w-5 h-5" /> : '1'}
          </div>
          <div className={cn('h-1 w-12 rounded', step >= 2 ? 'bg-primary' : 'bg-muted')} />
          <div className={cn(
            'flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium',
            step >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
          )}>
            2
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {step === 1 && (
            <>
              {/* Role Selection */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Select Your Role</Label>
                <Tabs value={selectedRole} onValueChange={(value) => setSelectedRole(value as UserRole)}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value={USER_ROLES.NGO}>NGO</TabsTrigger>
                    <TabsTrigger value={USER_ROLES.VOLUNTEER}>Volunteer</TabsTrigger>
                    <TabsTrigger value={USER_ROLES.DONOR}>Donor</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {/* Basic Info */}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              {/* Role-specific fields */}
              {selectedRole === USER_ROLES.NGO && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="orgName">Organization Name</Label>
                    <Input
                      id="orgName"
                      placeholder="Your NGO Name"
                      value={formData.orgName}
                      onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="regNumber">Registration Number</Label>
                    <Input
                      id="regNumber"
                      placeholder="NGO Registration Number"
                      value={formData.regNumber}
                      onChange={(e) => setFormData({ ...formData, regNumber: e.target.value })}
                      required
                    />
                  </div>
                </>
              )}

              {selectedRole === USER_ROLES.VOLUNTEER && (
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    After registration, you'll be able to add your skills, interests, and availability in your profile.
                  </p>
                </div>
              )}

              {selectedRole === USER_ROLES.DONOR && (
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    After registration, you'll be able to set your donation preferences and causes of interest.
                  </p>
                </div>
              )}

              {/* Terms and Conditions */}
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={acceptedTerms}
                  onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                />
                <label
                  htmlFor="terms"
                  className="text-sm leading-relaxed text-muted-foreground cursor-pointer"
                >
                  I agree to the{' '}
                  <a href="#" className="text-primary hover:underline">
                    Terms and Conditions
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-primary hover:underline">
                    Privacy Policy
                  </a>
                </label>
              </div>
            </>
          )}

          <div className="flex gap-3">
            {step === 2 && (
              <Button
                type="button"
                variant="outline"
                className="flex-1 touch-friendly"
                onClick={() => setStep(1)}
              >
                Back
              </Button>
            )}
            <Button
              type="submit"
              className="flex-1 touch-friendly"
              disabled={step === 1 ? !isStep1Valid : !acceptedTerms}
            >
              {step === 1 ? 'Continue' : 'Create Account'}
            </Button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link to={ROUTES.LOGIN} className="text-primary font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
