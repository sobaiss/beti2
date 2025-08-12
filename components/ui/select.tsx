'use client';

import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { cn } from '@/lib/utils';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  options: SelectOption[];
  className?: string;
}

export function Select({ value, onValueChange, placeholder, options, className }: SelectProps) {
  const [selected, setSelected] = useState<SelectOption | null>(
    options.find(option => option.value === value) || null
  );

  const handleChange = (option: SelectOption) => {
    setSelected(option);
    onValueChange?.(option.value);
  };

  return (
    <Listbox value={selected} onChange={handleChange}>
      <div className="relative">
        <Listbox.Button
          className={cn(
            'relative w-full cursor-default rounded-md bg-white py-2 pl-3 pr-10 text-left border border-gray-300 focus:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 sm:text-sm',
            className
          )}
        >
          <span className="block truncate">
            {selected ? selected.label : placeholder || 'Select an option'}
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10">
            {options.map((option) => (
              <Listbox.Option
                key={option.value}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? 'bg-blue-100 text-blue-900' : 'text-gray-900'
                  }`
                }
                value={option}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      {option.label}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}

// Legacy compatibility components
export const SelectTrigger = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={className}>{children}</div>
);

export const SelectValue = ({ placeholder }: { placeholder?: string }) => (
  <span>{placeholder}</span>
);

export const SelectContent = ({ children }: { children: React.ReactNode }) => (
  <div>{children}</div>
);

export const SelectItem = ({ value, children }: { value: string; children: React.ReactNode }) => (
  <div data-value={value}>{children}</div>
);