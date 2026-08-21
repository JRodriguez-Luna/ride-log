type InputVariant = 'primary' | 'secondary';
type NameVariants = "username" | "password" | "fullName" | "email"

type InputProps = {
  name: NameVariants;
  type: string;
  className?: string;
  variant?: InputVariant;
  required?: boolean;
};

const variants: Record<
  InputVariant,
  {
    border: string;
    legend: string;
  }
> = {
  primary: {
    border: 'border-accent',
    legend: 'bg-accent text-black',
  },
  // Fix Secondary
  secondary: {
    border: 'border-accent',
    legend: 'bg-accent text-black',
  },
};

const nameVariants: Record<NameVariants, string> = {
  username: 'john.doe99',
  email: "john.doe@example.com",
  password: 'password',
  fullName: 'John Doe',
};

export const Input = ({
  name,
  type,
  className = '',
  variant = 'primary',
  required,
}: InputProps) => {
  return (
    <fieldset
      className={`p-2 border rounded-xl ${variants[variant].border} ${className}`}
    >
      <legend className={`px-1 ${variants[variant].legend} capitalize`}>{name}</legend>
      <label htmlFor={name}>
        <input
          className='px-1 focus:outline-none'
          name={name}
          id={name}
          type={type}
          required={required}
          placeholder={nameVariants[name]}
        />
      </label>
    </fieldset>
  );
};
