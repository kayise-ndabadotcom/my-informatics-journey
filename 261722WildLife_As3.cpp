/*
Name: Ntombikayise
Surname: Ndaba
Student Number: 26172267
Module: COS2611
Assignment: Assessment 3

Program: Wildlife Corridor Network System
Description: This program models wildlife conservation corridors across Southern Africa.
It uses a graph data structure with adjacency list and provides BFS traversal and
Dijkstra's shortest path algorithms for network analysis.

NOTE: This implementation includes comprehensive XAI (Explainable AI) comments
to demonstrate understanding of the code and algorithms.
*/

#include <iostream>         // Include standard input/output stream library for cin and cout
#include <vector>           // Include vector container for dynamic arrays
#include <string>           // Include string class for handling text
#include <queue>            // Include queue container for BFS traversal
#include <limits>           // Include numeric limits for infinity representation in Dijkstra
#include <algorithm>        // Include algorithm utilities such as reverse
#include <map>              // Include map for name-to-index lookup
#include <iomanip>          // Include iomanip for formatted output (setw)
using namespace std;        // Use the standard namespace to avoid prefixing std:: everywhere

// ------------------------------------------------------------
// XAI: GraphNode Class
// Purpose: Represents a vertex (conservation area) in our graph.
// Each node has a name and stores connections to neighboring nodes.
// The adjacency list is implemented as a vector of pairs where:
// - first element is the index of the neighboring park
// - second element is the distance in kilometers
// This structure allows efficient traversal of connections.
// 
// Why use a vector of pairs? 
// - Vector: Dynamic size, we don't know how many connections each park will have
// - Pair: Stores two pieces of related data (neighbor index and distance)
// ------------------------------------------------------------
class GraphNode {                                 // Define GraphNode class
public:                                           // Public members accessible externally
    string name;                                  // Name of the conservation area (e.g., "Kruger National Park")
    vector<pair<int, int>> neighbors;             // Adjacency list: (neighbor_index, distance_in_km)

    // Constructor: Initializes a node with its name
    // The colon syntax (: name(n)) is called an initializer list - it's more efficient
    GraphNode(string n) : name(n) {}              // Initialize name using initializer list
};

// ------------------------------------------------------------
// XAI: Graph Class
// Purpose: Main graph container that manages all conservation areas.
// Uses an adjacency list approach where each park is a vertex.
// The graph stores:
// - nodes: vector of GraphNode objects (the conservation areas)
// - nodeIndex: map for O(1) lookup of park names to indices
// - numNodes: total number of parks in the network
// 
// This structure is efficient for:
// - Adding new parks (O(1))
// - Adding connections between parks (O(1) with lookup)
// - Traversing the network (O(V + E) for BFS)
// - Finding shortest paths (O((V + E) log V) for Dijkstra)
// 
// Map (nodeIndex) vs Vector (nodes):
// - Map: Quick name-to-index lookup O(log n) or O(1) with unordered_map
// - Vector: Quick index-to-name lookup O(1) and stores all graph data
// ------------------------------------------------------------
class Graph {                                     // Define Graph class
private:                                          // Private members hidden from external code
    vector<GraphNode> nodes;                      // Vector of all conservation areas (the actual graph data)
    map<string, int> nodeIndex;                   // Maps park name to its index for quick lookup
    int numNodes;                                 // Total number of parks in the network

public:                                           // Public interface for Graph
    // Constructor: Initializes an empty graph with zero nodes
    // Using member initializer list for efficiency
    Graph() : numNodes(0) {}                      // Initialize numNodes to 0

    // ------------------------------------------------------------
    // XAI: addNode Function
    // Purpose: Adds a new conservation area to the network.
    // Parameters:
    //   - name: The name of the conservation area (passed by const reference to avoid copying)
    // Process:
    //   1. Check if the park already exists in the network using the map
    //   2. If not, create a new GraphNode and add it to the vector
    //   3. Store the index mapping for quick lookup
    // Returns: true if successfully added, false if park already exists
    // Time Complexity: O(log n) due to map lookup
    // ------------------------------------------------------------
    bool addNode(const string& name) {            // Add a node by name
        // Check if this park already exists in the network
        // find() returns an iterator; if it equals end(), the key doesn't exist
        if (nodeIndex.find(name) != nodeIndex.end()) { // If name found in map
            return false;                          // Park already exists, cannot add duplicate
        }

        // Create new node and add to graph
        // push_back adds a copy of GraphNode to the end of the vector
        nodes.push_back(GraphNode(name));          // Append new GraphNode to nodes vector

        // Store the index mapping for quick lookup
        // nodeIndex[name] = numNodes creates an entry mapping name to its position
        nodeIndex[name] = numNodes;               // Map park name to current index
        numNodes++;                               // Increment the total node count
        return true;                              // Indicate success
    }

    // ------------------------------------------------------------
    // XAI: addEdge Function
    // Purpose: Adds a wildlife corridor (weighted edge) between two parks.
    // Parameters:
    //   - from: Name of the starting park (const reference)
    //   - to: Name of the destination park (const reference)
    //   - distance: Length of the corridor in kilometers
    // Process:
    //   1. Look up indices for both parks using the map
    //   2. Add the connection to both adjacency lists (undirected graph)
    //   3. Each connection stores the neighbor index and distance
    // Returns: true if successful, false if either park doesn't exist
    // Time Complexity: O(log n) for each lookup, O(1) for adding edges
    // 
    // Why undirected? Wildlife corridors work both ways - animals can migrate
    // in either direction between parks.
    // ------------------------------------------------------------
    bool addEdge(const string& from, const string& to, int distance) { // Add undirected edge
        // Find indices of both parks using the map
        // If either park doesn't exist, the find() will return end()
        if (nodeIndex.find(from) == nodeIndex.end() || // If 'from' not found
            nodeIndex.find(to) == nodeIndex.end()) {   // Or 'to' not found
            return false;                              // One or both parks don't exist in the network
        }

        int fromIdx = nodeIndex[from];                 // Get index of starting park
        int toIdx = nodeIndex[to];                     // Get index of destination park

        // Add edge to adjacency lists (undirected graph)
        // Each neighbor entry is a pair: {neighbor_index, distance}
        nodes[fromIdx].neighbors.push_back({ toIdx, distance }); // Add neighbor to from's list
        nodes[toIdx].neighbors.push_back({ fromIdx, distance }); // Add reverse neighbor to to's list
        return true;                                   // Indicate success
    }

    // ------------------------------------------------------------
    // XAI: getNodeIndex Function
    // Purpose: Returns the index of a park by its name.
    // Used for quick lookups during algorithm execution.
    // Returns -1 if the park does not exist in the network.
    // Time Complexity: O(log n) due to map lookup
    // ------------------------------------------------------------
    int getNodeIndex(const string& name) {           // Return index for a given park name
        if (nodeIndex.find(name) != nodeIndex.end()) { // If name exists in map
            return nodeIndex[name];                   // Return mapped index
        }
        return -1;                                    // Return -1 to indicate "not found"
    }

    // ------------------------------------------------------------
    // XAI: getNodeName Function
    // Purpose: Returns the name of a park given its index.
    // Helper function for displaying results in a readable format.
    // Time Complexity: O(1) - direct vector access
    // ------------------------------------------------------------
    string getNodeName(int index) {                   // Return park name for index
        if (index >= 0 && index < numNodes) {         // Validate index range
            return nodes[index].name;                 // Return name from nodes vector
        }
        return "";                                    // Return empty string if index is invalid
    }

    // ------------------------------------------------------------
    // XAI: getNumNodes Function
    // Purpose: Returns the total number of parks in the network.
    // Used for matrix display and algorithm iterations.
    // Time Complexity: O(1)
    // ------------------------------------------------------------
    int getNumNodes() {                               // Return number of nodes
        return numNodes;                              // Directly return numNodes
    }

    // ------------------------------------------------------------
    // XAI: getNeighbors Function
    // Purpose: Returns the adjacency list (neighbors and distances) for a park.
    // Parameters:
    //   - index: The index of the park
    // Returns: Vector of pairs containing neighbor indices and distances.
    // Essential for BFS and Dijkstra's algorithm implementations.
    // Time Complexity: O(1) - returns reference to existing vector
    // ------------------------------------------------------------
    vector<pair<int, int>> getNeighbors(int index) {  // Return neighbors for a given index
        if (index >= 0 && index < numNodes) {         // Validate index
            return nodes[index].neighbors;            // Return copy of neighbors vector
        }
        return vector<pair<int, int>>();              // Return empty vector if invalid
    }

    // ------------------------------------------------------------
    // XAI: displayNetwork Function
    // Purpose: Displays all conservation areas and their corridors.
    // Output format: "Park1 → Park2 (distance km)"
    // This provides a clear view of the entire conservation network.
    // Process:
    //   1. First display all park names
    //   2. Then display each corridor only once
    //   3. The check "neighbor.first > i" prevents duplicate displays
    // Time Complexity: O(E) where E is the number of edges
    // ------------------------------------------------------------
    void displayNetwork() {                                     // Print network summary and edges
        cout << "\n=== Wildlife Conservation Network ===\n";    // Header line
        cout << "Conservation Areas:\n";                        // Label for list of parks

        // Display all park names separated by commas
        for (int i = 0; i < numNodes; i++) {         // Iterate through nodes
            cout << nodes[i].name;                   // Print park name
            if (i < numNodes - 1) cout << ", ";      // Print comma except after last
        }
        cout << "\n\n";                              // Newlines for spacing

        cout << "Wildlife Corridors (Distances in km):\n"; // Label for edges
        // Display each connection only once (undirected graph)
        // We iterate through all nodes and only display edges where
        // the neighbor index is greater than the current index
        // This prevents displaying the same corridor twice
        for (int i = 0; i < numNodes; i++) {         // For each node index i
            for (auto& neighbor : nodes[i].neighbors) { // For each neighbor pair
                // Only display edge if neighbor index is greater than current
                // This is a common trick to display undirected edges once
                if (neighbor.first > i) {           // Avoid duplicate printing
                    cout << "  " << nodes[i].name << " -> " // Print "from" name
                        << nodes[neighbor.first].name     // Print "to" name
                        << " (" << neighbor.second << " km)\n"; // Print distance
                }
            }
        }
    }

    // ------------------------------------------------------------
    // XAI: displayAdjacencyMatrix Function
    // Purpose: Generates and displays the adjacency matrix.
    // The matrix is a numNodes x numNodes table where:
    // - Matrix[i][j] = distance if there's a corridor between i and j
    // - Matrix[i][j] = 0 if there's no direct connection
    // This provides a comprehensive overview of all network connections.
    // Process:
    //   1. Display column headers (park name abbreviations)
    //   2. For each row, check all columns for connections
    //   3. If connected, display the distance; otherwise display 0
    // Time Complexity: O(V^2 + E) where V is vertices and E is edges
    // ------------------------------------------------------------
    void displayAdjacencyMatrix() {                  // Print adjacency matrix
        cout << "\n=== Adjacency Matrix (Distances in km) ===\n\n"; // Header

        // Display header with park name abbreviations (first 2 letters)
        // setw(4) sets the width of each column to 4 characters for alignment
        cout << "      ";                            // Initial spacing for row labels
        for (int i = 0; i < numNodes; i++) {        // Column headers loop
            cout << setw(4) << nodes[i].name.substr(0, 2) << " "; // Print 2-letter header
        }
        cout << "\n";                               // Newline after header

        // Display each row of the matrix
        for (int i = 0; i < numNodes; i++) {        // For each row i
            // Row label (first 2 letters of park name)
            cout << setw(4) << nodes[i].name.substr(0, 2) << " "; // Print row label

            // For each column, check if there's a direct connection
            for (int j = 0; j < numNodes; j++) {    // For each column j
                int distance = 0;                   // Default 0 means no direct connection
                // Search through adjacency list for connection to park j
                for (auto& neighbor : nodes[i].neighbors) { // Check neighbors
                    if (neighbor.first == j) {     // If neighbor index matches column
                        distance = neighbor.second; // Set distance to edge weight
                        break;                      // Exit neighbor loop early
                    }
                }
                cout << setw(4) << distance << " "; // Print distance with width
            }
            cout << "\n";                           // Newline after each row
        }
    }

    // ------------------------------------------------------------
    // XAI: bfsTraversal Function
    // Purpose: Performs Breadth-First Search traversal from a starting park.
    // Algorithm:
    //   1. Start from the user-selected park
    //   2. Use a queue to process nodes level by level
    //   3. Mark visited nodes to avoid cycles
    //   4. Display the order of traversal
    // 
    // BFS is suitable for reachability analysis because it explores
    // all parks at the current distance level before moving further.
    // This ensures the shortest number of corridor hops to reach any park.
    // 
    // Why use a queue? BFS processes nodes in FIFO (First-In-First-Out) order,
    // which ensures we explore level by level - like ripples in water.
    // 
    // Parameters:
    //   - startName: Name of the starting conservation area
    // Returns: Vector of park names in BFS order
    // Time Complexity: O(V + E) where V is vertices and E is edges
    // ------------------------------------------------------------
    vector<string> bfsTraversal(const string& startName) { // BFS from startName
        vector<string> traversalOrder;                 // Stores visited park names in order

        // Find the index of the starting park
        int startIdx = getNodeIndex(startName);        // Map name to index
        if (startIdx == -1) {                          // If not found
            cout << "Error: Park not found!\n";        // Print error message
            return traversalOrder;                     // Return empty traversal
        }

        // Create visited array to track which parks have been discovered
        // Initially all false (not visited)
        vector<bool> visited(numNodes, false);         // Initialize visited flags

        // Queue for BFS - stores indices of parks to process
        // queue is a FIFO (First-In-First-Out) container
        queue<int> q;                                  // Create queue for indices

        // Start BFS from the starting park
        visited[startIdx] = true;                      // Mark start as visited
        q.push(startIdx);                              // Enqueue start index

        cout << "\n=== BFS Traversal from " << startName << " ===\n"; // Header
        cout << "Reachable Conservation Areas:\n";      // Label for traversal output

        // Process nodes in FIFO order
        // The queue ensures we explore level by level
        while (!q.empty()) {                           // While there are nodes to process
            // Get the next park from the front of the queue
            int currentIdx = q.front();                // Peek front index
            q.pop();                                   // Remove front element

            // Add current park to traversal order
            traversalOrder.push_back(nodes[currentIdx].name); // Append name to order

            // Display progress (formatted with arrows between parks)
            if (traversalOrder.size() > 1) {           // If not the first printed item
                cout << " -> ";                         // Print arrow separator
            }
            cout << nodes[currentIdx].name;            // Print current park name

            // Explore all neighbors of the current park
            // This is where BFS explores the graph level by level
            // We look at all neighbors of the current park
            for (auto& neighbor : nodes[currentIdx].neighbors) { // For each neighbor pair
                int neighborIdx = neighbor.first;     // Extract neighbor index

                // If neighbor hasn't been visited yet, add it to the queue
                if (!visited[neighborIdx]) {          // If not visited
                    visited[neighborIdx] = true;      // Mark as visited
                    q.push(neighborIdx);              // Enqueue neighbor index
                }
            }
        }
        cout << "\n";                                  // Newline after traversal output

        return traversalOrder;                         // Return the traversal order
    }

    // ------------------------------------------------------------
    // XAI: dijkstraShortestPath Function
    // Purpose: Finds the shortest path between two parks using Dijkstra's algorithm.
    // 
    // Algorithm Steps:
    //   1. Initialize distances to infinity for all parks except start (0)
    //   2. Use a priority queue to always process the closest unvisited park
    //   3. For each park, relax (update) distances to its neighbors
    //   4. Track the previous park in the path to reconstruct the route
    //   5. Stop when destination is reached or all parks are processed
    // 
    // Dijkstra's algorithm is appropriate here because:
    //   - All edge weights (distances) are positive (realistic corridors)
    //   - It guarantees the shortest path in weighted graphs
    //   - We need to find the minimum total distance for wildlife monitoring
    // 
    // Why use a priority queue? It always gives us the park with the smallest
    // known distance, which is the core of Dijkstra's algorithm.
    // 
    // Parameters:
    //   - startName: Starting conservation area
    //   - endName: Destination conservation area
    // Returns: true if path found, false otherwise
    // Time Complexity: O((V + E) log V) where V is vertices and E is edges
    // ------------------------------------------------------------
    bool dijkstraShortestPath(const string& startName, const string& endName) { // Dijkstra
        // Find indices of start and end parks
        int startIdx = getNodeIndex(startName);       // Map start name to index
        int endIdx = getNodeIndex(endName);           // Map end name to index

        if (startIdx == -1 || endIdx == -1) {         // Validate indices
            cout << "Error: One or both parks not found!\n"; // Print error
            return false;                             // Indicate failure
        }

        // Initialize distance array with infinity (maximum possible int value)
        // numeric_limits<int>::max() gives us the largest possible integer
        const int INF = numeric_limits<int>::max();   // Define INF constant
        vector<int> distance(numNodes, INF);          // Distance from start to each park
        vector<int> previous(numNodes, -1);           // Stores previous park in shortest path
        vector<bool> visited(numNodes, false);        // Tracks which parks are processed

        // Start with the starting park at distance 0
        distance[startIdx] = 0;                       // Distance to start is zero

        // Priority queue stores pairs of (distance, index)
        // The priority queue automatically gives us the park with smallest distance
        // This is the key optimization in Dijkstra's algorithm
        // 
        // Why greater<pair<int, int>>? We want smallest distance first (min-heap)
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq; // Min-heap
        pq.push({ 0, startIdx });                     // Push start with distance 0

        // Main loop: process parks in order of increasing distance
        // We continue until the queue is empty (processed all reachable parks)
        while (!pq.empty()) {                         // While there are nodes to process
            // Get the park with the smallest distance from the priority queue
            int currentDist = pq.top().first;        // Extract distance
            int currentIdx = pq.top().second;        // Extract index
            pq.pop();                                // Remove top element

            // Skip if we've already found a better path to this park
            // This happens when a park gets pushed multiple times with different distances
            if (visited[currentIdx]) continue;       // If already finalized, skip

            // Mark current park as visited (finalized)
            visited[currentIdx] = true;              // Finalize current node

            // If we've reached the destination, we can stop early
            // This is an optimization - we don't need to process other parks
            if (currentIdx == endIdx) {              // If destination reached
                break;                               // Exit main loop early
            }

            // Explore all neighbors of the current park
            // This is the relaxation step: check if going through current park
            // gives a shorter path to any of its neighbors
            for (auto& neighbor : nodes[currentIdx].neighbors) { // For each neighbor
                int neighborIdx = neighbor.first;    // Neighbor index
                int edgeWeight = neighbor.second;    // Edge weight (distance)

                // Calculate new distance through the current park
                int newDist = distance[currentIdx] + edgeWeight; // Potential new distance

                // If we found a shorter path to the neighbor, update it
                // This is the core of Dijkstra's algorithm - relaxation
                if (!visited[neighborIdx] && newDist < distance[neighborIdx]) { // If improvement
                    distance[neighborIdx] = newDist;   // Update distance
                    previous[neighborIdx] = currentIdx; // Record predecessor
                    pq.push({ newDist, neighborIdx }); // Push updated pair to priority queue
                }
            }
        }

        // Check if a path was found
        // If distance[endIdx] is still INF, no path exists
        if (distance[endIdx] == INF) {                 // If unreachable
            cout << "No path exists between " << startName << " and " << endName << "\n"; // Inform user
            return false;                              // Indicate failure
        }

        // Reconstruct the path by following previous pointers backwards
        // We start from the destination and follow the "previous" pointers
        // to trace back to the start
        vector<int> path;                              // Store indices of path
        for (int at = endIdx; at != -1; at = previous[at]) { // Walk backwards using previous[]
            path.push_back(at);                        // Append index to path
        }
        reverse(path.begin(), path.end());             // Reverse to get start->end order

        // Display the results
        cout << "\n=== Shortest Path from " << startName << " to " << endName << " ===\n"; // Header
        cout << "Route: ";                             // Label for route
        for (size_t i = 0; i < path.size(); i++) {     // Iterate through path indices
            cout << nodes[path[i]].name;               // Print park name for each index
            if (i < path.size() - 1) {                 // If not last element
                cout << " -> ";                         // Print arrow separator
            }
        }
        cout << "\nTotal distance: " << distance[endIdx] << " km\n"; // Print total distance

        return true;                                   // Indicate success
    }

    // ------------------------------------------------------------
    // XAI: menu Function
    // Purpose: Displays the main menu and handles user interaction.
    // This provides a user-friendly interface for exploring the network.
    // 
    // Process:
    //   1. Display menu options
    //   2. Get user choice
    //   3. Call appropriate function based on choice
    //   4. Loop until user chooses to exit
    // 
    // Input validation: Handles invalid choices and empty input.
    // ------------------------------------------------------------
    void menu() {                                    // Menu-driven interface
        int choice;                                  // Store user menu choice
        string startPark, endPark;                   // Buffers for park names

        do {                                         // Loop until user chooses to exit
            // Display menu options
            cout << "\n=== MENU ===\n";              // Menu header
            cout << "1. Display conservation network\n"; // Option 1
            cout << "2. Display adjacency matrix\n"; // Option 2
            cout << "3. Perform BFS traversal\n";    // Option 3
            cout << "4. Find shortest path between parks\n"; // Option 4
            cout << "5. Exit\n";                     // Option 5
            cout << "Enter your choice (1-5): ";    // Prompt for input

            // Validate input - ensure user enters a valid integer
            while (!(cin >> choice)) {               // If extraction fails
                cout << "Invalid input. Please enter a number (1-5): "; // Prompt again
                cin.clear();                         // Clear error flags
                cin.ignore(numeric_limits<streamsize>::max(), '\n'); // Discard invalid input
            }

            // Process user choice
            switch (choice) {                        // Branch on choice
            case 1:                                 // If user chose 1
                displayNetwork();                   // Show network
                break;                              // Break switch
            case 2:                                 // If user chose 2
                displayAdjacencyMatrix();           // Show adjacency matrix
                break;                              // Break switch
            case 3: {                               // If user chose 3 (BFS)
                // BFS traversal
                cout << "\nEnter starting conservation area: "; // Prompt for start
                cin.ignore();                        // Clear newline left by previous input
                getline(cin, startPark);             // Read full line including spaces
                bfsTraversal(startPark);             // Perform BFS and display
                break;                               // Break switch
            }
            case 4: {                               // If user chose 4 (Dijkstra)
                // Dijkstra's shortest path
                cout << "\nEnter starting conservation area: "; // Prompt for start
                cin.ignore();                        // Clear newline left by previous input
                getline(cin, startPark);             // Read start park name
                cout << "Enter destination conservation area: "; // Prompt for destination
                getline(cin, endPark);               // Read destination park name
                dijkstraShortestPath(startPark, endPark); // Compute and display shortest path
                break;                               // Break switch
            }
            case 5:                                 // If user chose 5 (Exit)
                // Exit the program
                cout << "\nThank you for using the Wildlife Corridor Network System.\n"; // Farewell
                cout << "Exiting...\n";            // Exit message
                break;                              // Break switch
            default:                                // Any other invalid numeric choice
                // Handle invalid choice (shouldn't happen with our validation)
                cout << "\nInvalid choice. Please enter a number between 1 and 5.\n"; // Error message
                break;                              // Break switch
            }

        } while (choice != 5);                     // Continue until user chooses exit
    }
}; // End of Graph class

// ------------------------------------------------------------
// XAI: Main Function
// Purpose: Entry point of the program. Handles:
//   1. Initializing the graph with conservation data
//   2. Displaying the program header
//   3. Starting the menu-driven interface
// 
// The data is hardcoded to represent the Southern African
// wildlife conservation network.
// ------------------------------------------------------------
int main() {                                       // Program entry point
    // Create the conservation network graph
    Graph corridorNetwork;                         // Instantiate Graph object

    // === XAI: Conservation Network Data ===
    // Hardcode at least 6 conservation areas as required
    // These represent major parks in Southern Africa
    // Each park is a node in our graph
    corridorNetwork.addNode("Kruger National Park"); // Add Kruger
    corridorNetwork.addNode("Limpopo National Park"); // Add Limpopo
    corridorNetwork.addNode("Chobe National Park");   // Add Chobe
    corridorNetwork.addNode("Hwange National Park");  // Add Hwange
    corridorNetwork.addNode("Etosha National Park");  // Add Etosha
    corridorNetwork.addNode("Kgalagadi Transfrontier Park"); // Add Kgalagadi

    // Add realistic wildlife corridors with distances in kilometers
    // These are approximate distances for demonstration purposes
    // Each corridor is an edge in our graph with a weight (distance)
    corridorNetwork.addEdge("Kruger National Park", "Limpopo National Park", 120); // Kruger-Limpopo
    corridorNetwork.addEdge("Limpopo National Park", "Chobe National Park", 290); // Limpopo-Chobe
    corridorNetwork.addEdge("Chobe National Park", "Hwange National Park", 90);   // Chobe-Hwange
    corridorNetwork.addEdge("Etosha National Park", "Kgalagadi Transfrontier Park", 850); // Etosha-Kgalagadi

    // Program header with student information
    cout << "\n========================================\n"; // Decorative header
    cout << "Programmer: Ntombikayise Ndaba\n";       // Print programmer name
    cout << "Student Number: 26172267\n";            // Print student number
    cout << "Wildlife Corridor Network System\n";   // Print program title
    cout << "Southern Africa Conservation Connectivity\n"; // Print subtitle
    cout << "========================================\n"; // Decorative footer

    // Start the menu-driven interface
    // This handles all user interaction
    corridorNetwork.menu();                        // Launch menu loop

    return 0;                                      // Return success code
}

/* ============================================================
// AI REFLECTION AND tOOL USAGE LOG
// ============================================================

//AI TOOLS USED:
// 1. ChatGPT (OpenAI, GPT-5.5)
// 2. Microsoft Copilot
//

I used ChatGPT and Microsoft copilot to help me understand the graph data structures,
BFS traversal, Dikstra's
====================================================================
GENAI PROMPTS USED
====================================================================
1. How do I implement an adjacency list graph in C++ with weighted edges?
2. Write a Breadth-First Search (BFS) traversal function for a graph in C++ that displays the traversal order.
3. Implement Dijkstra's shortest path algorithm in C++ with path reconstruction.
4. How do I display an adjacency matrix from an adjacency list in C++?
5. Create a menu-driven interface for a graph program in C++.
6. Explain the difference between an adjacency list and an adjacency matrix.
7. How does Dijkstra's algorithm work step by step?
8. What is a priority queue, and why is it used in Dijkstra's algorithm?
9. Add Explainable AI (XAI) comments to my C++ program explaining the purpose of variables, functions, data structures, BFS, and Dijkstra's algorithm.
10. Review my C++ code and suggest improvements.

REFLECTION:
-----------
What worked well:
- The AI provided a solid foundation for the graph structure with clear code organization
- Algorithm implementations (BFS and Dijkstra) were logically correct from the start
- The explanations helped me understand why each data structure was chosen
- The priority queue and queue usage were explained clearly, making the algorithms easier to grasp
- The AI helped clarify when to use int vs double for distances

What did not work:
- Some AI-generated code had syntax errors, particularly with template declarations
- The initial code didn't handle input validation properly (menu choices)
- Park names were sometimes inconsistent between addNode and addEdge calls
- The adjacency matrix display needed formatting adjustments for readability
- The AI initially suggested using double for distances, but the assignment examples used int so I wasn't sure which one was appropriate,
-but I ended up settling for int.

Changes I made to the AI-generated code:
- Fixed all syntax errors and compiler warnings
- Added comprehensive XAI comments throughout (this was a major addition)
- Improved variable naming to maintain consistent throughout the code (nodes instead of adj, numNodes instead of V)
- Improved the menu function with proper input validation using cin.clear() and cin.ignore()
- Corrected park names to maintain consistency across all function calls
- Enhanced the adjacency matrix display with setw() for proper alignment
- Added better error handling for invalid park names in BFS and Dijkstra
- Made the output formatting more readable with consistent spacing and arrows
- Used const string& parameters to improve performance
- Added additional comments explaining the "why" behind each implementation choice
- Chose int for distances as it matched the assignment examples and simplified the code

Final thoughts:
The AI tools were extremely helpful for getting the basic structure and algorithms correctly. However, they 
required significant refinement to meet the assignment's XAI requirements and to handle real-world edge cases.
The biggest value was in explaining the concepts (like how Dikstra works) which helped me understand the code 
better. The AI saved time on setting up the standard sections of code but it doesn't replace the need for  
undersatnding and proper implementation.

*/

// ============================================================
// END OF PROGRAM
// ============================================================