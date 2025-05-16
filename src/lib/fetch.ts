// import { flattenAttributes } from "@/lib/utils";

// export async function fetchData(url: string, authToken?: string) {

//   const headers = {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${authToken}`,
//     },
//   };

//   try {
//     const response = await fetch(url, authToken ? headers : {});
//     const data = await response.json();
//     if (!response.ok) throw new Error("Failed to fetch data");
//     return flattenAttributes(data);
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     throw error; // or return null;
//   }
// }

import { flattenAttributes } from "@/lib/utils";

export async function fetchData(url: string, options?: any, authToken?: string) {
  // Combine default fetch options with any passed options
  const fetchOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    },
    // Spread any additional options (like cache settings) that were passed
    ...options
  };

  try {
    const response = await fetch(url, fetchOptions);
    
    // Check if response is OK before processing
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return flattenAttributes(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    // You might want to return null here instead of re-throwing
    // to prevent crashing your app when in production
    throw error;
  }
}