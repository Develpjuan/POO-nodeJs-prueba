import bcrypt from 'bcrypt';

async function hashedPassword(textPassword) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(textPassword, salt);
    console.log(hashedPassword);
}

// hashedPassword("admin123");
// hashedPassword("user123");
// hashedPassword("123456");
hashedPassword("1000517116");
