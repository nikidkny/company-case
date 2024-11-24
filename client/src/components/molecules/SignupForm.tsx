import { useState } from "react";

export default function SignupForm() {
    const [formData, setFormData] = useState({
        firstName: "Andrea",
        lastName: "Di Claudio",
        email: "andrea@gmail.com",
        password: "password",
        confirmPassword: "password",
        birthdate: "",
        isAvailable: true
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(formData);
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        console.log(formData);
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            console.log(formData);
            

            if (response.ok) {
                alert("Signup successful!");
            } else {
                const error = await response.json();
                alert(`Signup failed: ${error.message}`);
            }
        } catch (err) {
            console.error("Error during signup", err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form">
            <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
            />
            <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
            />
            <input
                type="date"
                name="birthdate"
                value={formData.birthdate}
                onChange={handleChange}
                required
            />
            <label>
                <input
                    type="checkbox"
                    name="isAvailable"
                    checked={formData.isAvailable}
                    onChange={handleChange}
                />
                Available for contact
            </label>
            <button type="submit" className="btn">Sign Up</button>
        </form>
    );
}