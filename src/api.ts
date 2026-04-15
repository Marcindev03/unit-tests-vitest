export type User = {
  id: number;
  name: string;
  role?: string;
  email?: string;
  isActive?: boolean;
};

export type NewUserData = {
  name: string;
  role?: string;
};

export type CreateUserResponse = {
  success: boolean;
  user: User;
};

export async function fetchUser(id: number): Promise<User> {
  return new Promise<User>((resolve, reject) => {
    setTimeout(() => {
      if (id <= 0) return reject(new Error("Invalid ID"));
      resolve({ id, name: "Janusz", role: "Developer" });
    }, 100);
  });
}

export async function createUser(
  userData: NewUserData,
): Promise<CreateUserResponse> {
  return new Promise<CreateUserResponse>((resolve, reject) => {
    setTimeout(() => {
      if (!userData.name) return reject(new Error("Name is required"));
      resolve({
        success: true,
        user: {
          id: Date.now(),
          name: userData.name,
          role: userData.role ?? "Developer",
        },
      });
    }, 100);
  });
}
