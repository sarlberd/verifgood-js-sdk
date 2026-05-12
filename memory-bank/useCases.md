# VerifgoodSDK Use Cases

This document outlines common use cases for the VerifgoodSDK, demonstrating how it can be integrated into various applications and workflows.

## Table of Contents

1. [User Management](#user-management)
2. [Category Management](#category-management)
3. [Task Management](#task-management)
4. [Equipment Management](#equipment-management)
5. [Location Management](#location-management)
6. [Checkpoint Management](#checkpoint-management)
7. [Reporting and Analytics](#reporting-and-analytics)
8. [Integration Scenarios](#integration-scenarios)

## User Management

### Use Case 1: User Invitation and Registration

**Scenario**: An administrator needs to invite new users to the Verifgood platform and manage their registration process.

**Implementation**:

```typescript
import { VGSDK, SdkConfiguration } from "verifgood-js-sdk";
import { InvitationRequest } from "verifgood-js-sdk";

// Initialize SDK
const vgsdk = new VGSDK({
  apiBaseUrl: "https://symlab-v2.herokuapp.com/public/index.php",
  apiKey: "your-api-key"
});

// Step 1: Generate invitation for a new user
async function inviteUser(email: string, role: string) {
  try {
    const invitationRequest: InvitationRequest = { email, role };
    const invitation = await vgsdk.invitations.generateInvitationLink(invitationRequest);
    
    console.log(`Invitation created for ${email}`);
    console.log(`Invitation token: ${invitation.token}`);
    
    // In a real application, you would send this invitation link to the user via email
    const invitationLink = `https://your-app.com/register?token=${invitation.token}`;
    console.log(`Invitation link: ${invitationLink}`);
    
    return invitation;
  } catch (error) {
    console.error("Error creating invitation:", error);
    throw error;
  }
}

// Example usage
inviteUser("newuser@example.com", "ROLE_ADMIN")
  .then(invitation => {
    console.log("Invitation process completed");
  })
  .catch(error => {
    console.error("Invitation process failed:", error);
  });
```

### Use Case 2: Validating User Invitations

**Scenario**: When a user clicks on an invitation link, the application needs to validate the invitation token.

**Implementation**:

```typescript
import { VGSDK, SdkConfiguration } from "verifgood-js-sdk";
import { InvitationCard } from "verifgood-js-sdk";

// Initialize SDK
const vgsdk = new VGSDK({
  apiBaseUrl: "https://symlab-v2.herokuapp.com/public/index.php",
  apiKey: "your-api-key"
});

// Validate an invitation token when a user clicks the link
async function validateInvitation(token: string) {
  try {
    const invitationToCheck: InvitationCard = {
      token: token,
      origin: window.location.origin,
      email: "" // Email can be empty as the token is sufficient
    };
    
    const validatedInvitation = await vgsdk.invitations.checkInvitation(invitationToCheck);
    
    if (validatedInvitation.status === "error") {
      console.error("Invalid invitation token");
      return null;
    }
    
    console.log("Invitation is valid:", validatedInvitation);
    return validatedInvitation;
  } catch (error) {
    console.error("Error validating invitation:", error);
    throw error;
  }
}

// Example usage in a registration page component
function RegistrationPage() {
  // Extract token from URL query parameters
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');
  
  if (token) {
    validateInvitation(token)
      .then(invitation => {
        if (invitation) {
          // Show registration form with email pre-filled
          showRegistrationForm(invitation.email);
        } else {
          // Show error message
          showErrorMessage("Invalid invitation link");
        }
      })
      .catch(error => {
        showErrorMessage("Error validating invitation");
      });
  } else {
    showErrorMessage("No invitation token provided");
  }
}
```

### Use Case 3: Completing User Registration

**Scenario**: After validating an invitation, the user needs to complete their registration by setting a password.

**Implementation**:

```typescript
import { VGSDK, SdkConfiguration } from "verifgood-js-sdk";
import { InvitationCompleteRegistration } from "verifgood-js-sdk";

// Initialize SDK
const vgsdk = new VGSDK({
  apiBaseUrl: "https://symlab-v2.herokuapp.com/public/index.php",
  apiKey: "your-api-key"
});

// Complete the registration process
async function completeRegistration(token: string, password: string, passwordConfirm: string) {
  try {
    // Validate password requirements
    if (password.length < 8) {
      throw new Error("Password must be at least 8 characters long");
    }
    
    if (password !== passwordConfirm) {
      throw new Error("Passwords do not match");
    }
    
    const registrationData: InvitationCompleteRegistration = {
      invitation_token: token,
      password: password,
      password_confirm: passwordConfirm
    };
    
    const result = await vgsdk.invitations.completeRegistration(registrationData);
    console.log("Registration completed successfully:", result);
    
    // In a real application, you would redirect to login page or dashboard
    return result;
  } catch (error) {
    console.error("Error completing registration:", error);
    throw error;
  }
}

// Example usage in a registration form submission handler
function handleRegistrationSubmit(event) {
  event.preventDefault();
  
  const token = document.getElementById('token').value;
  const password = document.getElementById('password').value;
  const passwordConfirm = document.getElementById('password-confirm').value;
  
  completeRegistration(token, password, passwordConfirm)
    .then(result => {
      showSuccessMessage("Registration completed successfully!");
      redirectToLogin();
    })
    .catch(error => {
      showErrorMessage(error.message);
    });
}
```

## Category Management

### Use Case 4: Retrieving and Displaying Categories

**Scenario**: An application needs to display a list of categories with filtering and pagination.

**Implementation**:

```typescript
import { VGSDK, SdkConfiguration, Metadatas } from "verifgood-js-sdk";

// Initialize SDK
const vgsdk = new VGSDK({
  apiBaseUrl: "https://symlab-v2.herokuapp.com/public/index.php",
  apiKey: "your-api-key"
});

// Fetch categories with filtering and pagination
async function fetchCategories(page = 0, pageSize = 10, filter = null) {
  try {
    const metadatas = new Metadatas();
    
    // Set pagination
    const offset = page * pageSize;
    metadatas.setLimit(offset, pageSize);
    
    // Apply filter if provided
    if (filter) {
      if (filter.tag) {
        metadatas.setFilter("tags", filter.tag, "equals");
      }
      if (filter.name) {
        metadatas.setFilter("name", filter.name, "contains");
      }
    }
    
    const categories = await vgsdk.categories.getAll(metadatas);
    console.log(`Fetched ${categories.datas.length} categories`);
    
    return {
      items: categories.datas,
      total: categories.total || categories.datas.length,
      page: page,
      pageSize: pageSize
    };
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}

// Example usage in a category listing component
function CategoryListingComponent() {
  // State variables for current page, page size, and filter
  let currentPage = 0;
  let pageSize = 10;
  let currentFilter = { tag: null, name: null };
  
  // Initial load
  loadCategories();
  
  // Load categories with current pagination and filter
  function loadCategories() {
    fetchCategories(currentPage, pageSize, currentFilter)
      .then(result => {
        displayCategories(result.items);
        updatePagination(result.page, result.pageSize, result.total);
      })
      .catch(error => {
        showErrorMessage("Failed to load categories");
      });
  }
  
  // Handle filter change
  function handleFilterChange(newFilter) {
    currentFilter = newFilter;
    currentPage = 0; // Reset to first page when filter changes
    loadCategories();
  }
  
  // Handle page change
  function handlePageChange(newPage) {
    currentPage = newPage;
    loadCategories();
  }
}
```

### Use Case 5: Creating and Updating Categories

**Scenario**: An administrator needs to create new categories and update existing ones.

**Implementation**:

```typescript
import { VGSDK, SdkConfiguration } from "verifgood-js-sdk";

// Initialize SDK
const vgsdk = new VGSDK({
  apiBaseUrl: "https://symlab-v2.herokuapp.com/public/index.php",
  apiKey: "your-api-key"
});

// Create a new category
async function createCategory(categoryData) {
  try {
    const result = await vgsdk.categories.create(categoryData);
    console.log("Category created successfully:", result);
    return result;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
}

// Update an existing category
async function updateCategory(categoryId, categoryData) {
  try {
    const result = await vgsdk.categories.update(categoryId, categoryData);
    console.log(`Category ${categoryId} updated successfully:`, result);
    return result;
  } catch (error) {
    console.error(`Error updating category ${categoryId}:`, error);
    throw error;
  }
}

// Example usage in a category form component
function CategoryFormComponent(categoryId = null) {
  // If categoryId is provided, we're updating an existing category
  // Otherwise, we're creating a new one
  
  // Load existing category data if updating
  if (categoryId) {
    vgsdk.categories.getById(categoryId)
      .then(category => {
        populateForm(category);
      })
      .catch(error => {
        showErrorMessage(`Failed to load category ${categoryId}`);
      });
  }
  
  // Handle form submission
  function handleSubmit(formData) {
    if (categoryId) {
      // Update existing category
      updateCategory(categoryId, formData)
        .then(result => {
          showSuccessMessage("Category updated successfully");
          redirectToCategoryList();
        })
        .catch(error => {
          showErrorMessage("Failed to update category");
        });
    } else {
      // Create new category
      createCategory(formData)
        .then(result => {
          showSuccessMessage("Category created successfully");
          redirectToCategoryList();
        })
        .catch(error => {
          showErrorMessage("Failed to create category");
        });
    }
  }
}
```

## Task Management

### Use Case 6: Retrieving Tasks with Their Checkpoints

**Scenario**: An application needs to display tasks along with their associated checkpoints.

**Implementation**:

```typescript
import { VGSDK, SdkConfiguration, Metadatas } from "verifgood-js-sdk";

// Initialize SDK
const vgsdk = new VGSDK({
  apiBaseUrl: "https://symlab-v2.herokuapp.com/public/index.php",
  apiKey: "your-api-key"
});

// Fetch tasks with their checkpoints
async function fetchTasksWithCheckpoints(taskType = null) {
  try {
    // Create metadata for tasks query
    const tachesMetadatas = new Metadatas();
    tachesMetadatas.setLimit(0, 25);
    
    // Apply task type filter if provided
    if (taskType) {
      tachesMetadatas.setFilter("type_tache", taskType, "equals");
    }
    
    // Get tasks
    const taches = await vgsdk.taches.getAll(tachesMetadatas);
    console.log(`Fetched ${taches.datas.length} tasks`);
    
    // If no tasks found, return empty result
    if (!taches.datas || taches.datas.length === 0) {
      return { tasks: [] };
    }
    
    // Extract task IDs
    const tacheIds = taches.datas.map(tache => tache.id);
    
    // Create metadata for checkpoints query
    const checkpointsMetadatas = new Metadatas();
    checkpointsMetadatas.setFilter("idTache_id", tacheIds, "equals");
    
    // Get checkpoints
    const checkpoints = await vgsdk.checkpoints.getAll(checkpointsMetadatas);
    console.log(`Fetched ${checkpoints.datas.length} checkpoints`);
    
    // Combine tasks with their checkpoints
    taches.datas.forEach(tache => {
      tache.checkpoints = checkpoints.datas.filter(checkpoint => 
        checkpoint.idTache_id === tache.id
      );
    });
    
    return { tasks: taches.datas };
  } catch (error) {
    console.error("Error fetching tasks with checkpoints:", error);
    throw error;
  }
}

// Example usage in a task dashboard component
function TaskDashboardComponent() {
  // Load tasks for a specific type
  loadTasksWithCheckpoints("Verification_equipement");
  
  function loadTasksWithCheckpoints(taskType) {
    fetchTasksWithCheckpoints(taskType)
      .then(result => {
        displayTasks(result.tasks);
      })
      .catch(error => {
        showErrorMessage("Failed to load tasks");
      });
  }
  
  // Handle task type filter change
  function handleTaskTypeChange(newTaskType) {
    loadTasksWithCheckpoints(newTaskType);
  }
}
```

### Use Case 7: Creating and Assigning Tasks

**Scenario**: A manager needs to create new tasks and assign them to specific locations or equipment.

**Implementation**:

```typescript
import { VGSDK, SdkConfiguration } from "verifgood-js-sdk";

// Initialize SDK
const vgsdk = new VGSDK({
  apiBaseUrl: "https://symlab-v2.herokuapp.com/public/index.php",
  apiKey: "your-api-key"
});

// Create a new task
async function createTask(taskData) {
  try {
    const result = await vgsdk.taches.create(taskData);
    console.log("Task created successfully:", result);
    return result;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
}

// Create checkpoints for a task
async function createCheckpointsForTask(taskId, checkpointsData) {
  try {
    const createdCheckpoints = [];
    
    // Create each checkpoint
    for (const checkpointData of checkpointsData) {
      // Add task ID to checkpoint data
      checkpointData.idTache_id = taskId;
      
      // Create checkpoint
      const result = await vgsdk.checkpoints.create(checkpointData);
      createdCheckpoints.push(result);
    }
    
    console.log(`Created ${createdCheckpoints.length} checkpoints for task ${taskId}`);
    return createdCheckpoints;
  } catch (error) {
    console.error(`Error creating checkpoints for task ${taskId}:`, error);
    throw error;
  }
}

// Example usage in a task creation form
function TaskCreationForm() {
  // Handle form submission
  async function handleSubmit(formData) {
    try {
      // Extract task data and checkpoints data from form
      const { taskData, checkpointsData } = extractFormData(formData);
      
      // Create task
      const taskResult = await createTask(taskData);
      const taskId = taskResult.id;
      
      // Create checkpoints for the task
      await createCheckpointsForTask(taskId, checkpointsData);
      
      showSuccessMessage("Task created successfully with checkpoints");
      redirectToTaskList();
    } catch (error) {
      showErrorMessage("Failed to create task");
    }
  }
  
  // Helper function to extract task and checkpoints data from form
  function extractFormData(formData) {
    // Extract task data
    const taskData = {
      name: formData.taskName,
      description: formData.taskDescription,
      type_tache: formData.taskType,
      // Other task fields...
    };
    
    // Extract checkpoints data
    const checkpointsData = formData.checkpoints.map(checkpoint => ({
      name: checkpoint.name,
      description: checkpoint.description,
      // Other checkpoint fields...
    }));
    
    return { taskData, checkpointsData };
  }
}
```

## Equipment Management

### Use Case 8: Managing Equipment Inventory

**Scenario**: A facility manager needs to maintain an inventory of equipment with filtering and search capabilities.

**Implementation**:

```typescript
import { VGSDK, SdkConfiguration, Metadatas } from "verifgood-js-sdk";

// Initialize SDK
const vgsdk = new VGSDK({
  apiBaseUrl: "https://symlab-v2.herokuapp.com/public/index.php",
  apiKey: "your-api-key"
});

// Fetch equipment with filtering and search
async function fetchEquipment(page = 0, pageSize = 10, filters = {}) {
  try {
    const metadatas = new Metadatas();
    
    // Set pagination
    const offset = page * pageSize;
    metadatas.setLimit(offset, pageSize);
    
    // Apply filters
    if (filters.name) {
      metadatas.setFilter("name", filters.name, "contains");
    }
    
    if (filters.category) {
      metadatas.setFilter("category_id", filters.category, "equals");
    }
    
    if (filters.location) {
      metadatas.setFilter("location_id", filters.location, "equals");
    }
    
    if (filters.status) {
      metadatas.setFilter("status", filters.status, "equals");
    }
    
    // Fetch equipment
    const equipment = await vgsdk.equipements.getAll(metadatas);
    console.log(`Fetched ${equipment.datas.length} equipment items`);
    
    return {
      items: equipment.datas,
      total: equipment.total || equipment.datas.length,
      page: page,
      pageSize: pageSize
    };
  } catch (error) {
    console.error("Error fetching equipment:", error);
    throw error;
  }
}

// Add new equipment
async function addEquipment(equipmentData) {
  try {
    const result = await vgsdk.equipements.create(equipmentData);
    console.log("Equipment added successfully:", result);
    return result;
  } catch (error) {
    console.error("Error adding equipment:", error);
    throw error;
  }
}

// Update equipment
async function updateEquipment(equipmentId, equipmentData) {
  try {
    const result = await vgsdk.equipements.update(equipmentId, equipmentData);
    console.log(`Equipment ${equipmentId} updated successfully:`, result);
    return result;
  } catch (error) {
    console.error(`Error updating equipment ${equipmentId}:`, error);
    throw error;
  }
}

// Example usage in an equipment management component
function EquipmentManagementComponent() {
  // State variables
  let currentPage = 0;
  let pageSize = 10;
  let currentFilters = {
    name: null,
    category: null,
    location: null,
    status: null
  };
  
  // Initial load
  loadEquipment();
  
  // Load equipment with current pagination and filters
  function loadEquipment() {
    fetchEquipment(currentPage, pageSize, currentFilters)
      .then(result => {
        displayEquipment(result.items);
        updatePagination(result.page, result.pageSize, result.total);
      })
      .catch(error => {
        showErrorMessage("Failed to load equipment");
      });
  }
  
  // Handle filter change
  function handleFilterChange(newFilters) {
    currentFilters = { ...currentFilters, ...newFilters };
    currentPage = 0; // Reset to first page when filters change
    loadEquipment();
  }
  
  // Handle equipment form submission (add/update)
  function handleEquipmentFormSubmit(formData, equipmentId = null) {
    if (equipmentId) {
      // Update existing equipment
      updateEquipment(equipmentId, formData)
        .then(result => {
          showSuccessMessage("Equipment updated successfully");
          loadEquipment(); // Reload the list
        })
        .catch(error => {
          showErrorMessage("Failed to update equipment");
        });
    } else {
      // Add new equipment
      addEquipment(formData)
        .then(result => {
          showSuccessMessage("Equipment added successfully");
          loadEquipment(); // Reload the list
        })
        .catch(error => {
          showErrorMessage("Failed to add equipment");
        });
    }
  }
}
```

## Location Management

### Use Case 9: Managing Locations and Hierarchies

**Scenario**: A facility manager needs to manage locations and their hierarchical relationships.

**Implementation**:

```typescript
import { VGSDK, SdkConfiguration, Metadatas } from "verifgood-js-sdk";

// Initialize SDK
const vgsdk = new VGSDK({
  apiBaseUrl: "https://symlab-v2.herokuapp.com/public/index.php",
  apiKey: "your-api-key"
});

// Fetch all locations
async function fetchAllLocations() {
  try {
    const metadatas = new Metadatas();
    const locations = await vgsdk.lieux.getAll(metadatas);
    console.log(`Fetched ${locations.datas.length} locations`);
    return locations.datas;
  } catch (error) {
    console.error("Error fetching locations:", error);
    throw error;
  }
}

// Build location hierarchy
function buildLocationHierarchy(locations) {
  // Create a map of locations by ID for quick lookup
  const locationsMap = {};
  locations.forEach(location => {
    locationsMap[location.id] = {
      ...location,
      children: []
    };
  });
  
  // Build the hierarchy
  const rootLocations = [];
  
  locations.forEach(location => {
    const locationWithChildren = locationsMap[location.id];
    
    if (location.parent_id && locationsMap[location.parent_id]) {
      // This location has a parent, add it as a child of the parent
      locationsMap[location.parent_id].children.push(locationWithChildren);
    } else {
      // This is a root location
      rootLocations.push(locationWithChildren);
    }
  });
  
  return rootLocations;
}

// Create a new location
async function createLocation(locationData) {
  try {
    const result = await vgsdk.lieux.create(locationData);
    console.log("Location created successfully:", result);
    return result;
  } catch (error) {
    console.error("Error creating location:", error);
    throw error;
  }
}

// Update a location
async function updateLocation(locationId, locationData) {
  try {
    const result = await vgsdk.lieux.update(locationId, locationData);
    console.log(`Location ${locationId} updated successfully:`, result);
    return result;
  } catch (error) {
    console.error(`Error updating location ${locationId}:`, error);
    throw error;
  }
}

// Example usage in a location management component
function LocationManagementComponent() {
  // Load and display location hierarchy
  loadLocationHierarchy();
  
  async function loadLocationHierarchy() {
    try {
      // Fetch all locations
      const locations = await fetchAllLocations();
      
      // Build hierarchy
      const hierarchy = buildLocationHierarchy(locations);
      
      // Display hierarchy
      displayLocationHierarchy(hierarchy);
    } catch (error) {
      showErrorMessage("Failed to load locations");
    }
  }
  
  // Handle location form submission (create/update)
  function handleLocationFormSubmit(formData, locationId = null) {
    if (locationId) {
      // Update existing location
      updateLocation(locationId, formData)
        .then(result => {
          showSuccessMessage("Location updated successfully");
          loadLocationHierarchy(); // Reload the hierarchy
        })
        .catch(error => {
          showErrorMessage("Failed to update location");
        });
    } else {
      // Create new location
      createLocation(formData)
        .then(result => {
          showSuccessMessage("Location created successfully");
          loadLocationHierarchy(); // Reload the hierarchy
        })
        .catch(error => {
          showErrorMessage("Failed to create location");
        });
    }
  }
}
```

## Checkpoint Management

### Use Case 10: Managing Checkpoints for Tasks

**Scenario**: A quality manager needs to create and manage checkpoints for verification tasks.

**Implementation**:

```typescript
import { VGSDK, SdkConfiguration, Metadatas } from "verifgood-js-sdk";

// Initialize SDK
const vgsdk = new VGSDK({
  apiBaseUrl: "https://symlab-v2.herokuapp.com/public/index.php",
  apiKey: "your-api-key"
});

// Fetch checkpoints for a specific task
async function fetchCheckpointsForTask(taskId) {
  try {
    const metadatas = new Metadatas();
    metadatas.setFilter("idTache_id", taskId, "equals");
    
    const checkpoints = await vgsdk.checkpoints.getAll(metadatas);
    console.log(`Fetched ${checkpoints.datas.length} checkpoints for task ${taskId}`);
    
    return checkpoints.datas;
  } catch (error) {
    console.error(`Error fetching checkpoints for task ${taskId}:`, error);
    throw error;
  }
}

// Create a new checkpoint
async function createCheckpoint(checkpointData) {
  try {
    const result = await vgsdk.checkpoints.create(checkpointData);
    console.log("Checkpoint created successfully:", result);
    return result;
  } catch (error) {
    console.error("Error creating checkpoint:", error);
    throw error;
  }
}

// Update a checkpoint
async function updateCheckpoint(checkpointId, checkpointData) {
  try {
    const result = await vgsdk.checkpoints.update(checkpointId, checkpointData);
    console.log(`Checkpoint ${checkpointId} updated successfully:`, result);
    return result;
  } catch (error) {
    console.error(`Error updating checkpoint ${checkpointId}:`, error);
    throw error;
  }
}

// Delete a checkpoint
async function deleteCheckpoint(checkpointId) {
  try {
    const result = await vgsdk.checkpoints.remove(checkpointId);
    console.log(`Checkpoint ${checkpointId} deleted successfully:`, result);
    return result;
  } catch (error) {
    console.error(`Error deleting checkpoint ${checkpointId}:`, error);
    throw error;
  }
}

// Example usage in a checkpoint management component
function CheckpointManagementComponent(taskId) {
  // Load checkpoints for the task
  loadCheckpoints();
  
  function loadCheckpoints() {
    fetchCheckpointsForTask(taskId)
      .then(checkpoints => {
        displayCheckpoints(checkpoints);
      })
      .catch(error => {
        showErrorMessage("Failed to load checkpoints");
      });
  }
  
  // Handle checkpoint form submission (create/update)
  function handleCheckpointFormSubmit(formData, checkpointId = null) {
    // Add task ID to checkpoint data
    formData.idTache_id = taskId;
    
    if (checkpointId) {
      // Update existing checkpoint
      updateCheckpoint(checkpointId, formData)
        .then(result => {
          showSuccessMessage("Checkpoint updated successfully");
          loadCheckpoints(); // Reload the list
        })
        .catch(error => {
          showErrorMessage("Failed to update checkpoint");
        });
    } else {
      // Create new checkpoint
      createCheckpoint(formData)
        .then(result => {
          showSuccessMessage("Checkpoint created successfully");
          loadCheckpoints(); // Reload the list
        })
        .catch(error => {
          showErrorMessage("Failed to create checkpoint");
        });
    }
  }
  
  // Handle checkpoint deletion
  function handleCheckpointDelete(checkpointId) {
    if (confirm("Are you sure you want to delete this checkpoint?")) {
      deleteCheckpoint(checkpointId)
        .then(result => {
          showSuccessMessage("Checkpoint deleted successfully");
          loadCheckpoints(); // Reload the list
        })
        .catch(error => {
          showErrorMessage("Failed to delete checkpoint");
        });
    }
  }
}
```

## Reporting and Analytics

### Use Case 11: Generating Reports on Task Completion

**Scenario**: A manager needs to generate reports on task completion rates and status.

**Implementation**:

```typescript
import { VGSDK, SdkConfiguration, Metadatas } from "verifgood-js-sdk";

// Initialize SDK
const vgsdk = new VGSDK({
  apiBaseUrl: "https://symlab-v2.herokuapp.com/public/index.php",
  apiKey: "your-api-key"
});

// Fetch tasks with status information for reporting
async function fetchTasksForReporting(startDate, endDate, filters = {}) {
  try {
    const metadatas = new Metadatas();
    
    // Set date range filter
    if (startDate && endDate) {
      metadatas.setFilter("created_at", { start: startDate, end: endDate }, "between");
    }
    
    // Apply additional filters
    if (filters.type) {
      metadatas.setFilter("type_tache", filters.type, "equals");
    }
    
    if (filters.status) {
      metadatas.setFilter("status", filters.status, "equals");
    }
    
    if (filters.location) {
      metadatas.setFilter("location_id", filters.location, "equals");
    }
    
    // No limit to get all tasks in the date range
    metadatas.setLimit(0, 1000);
    
    // Fetch tasks
    const tasks = await vgsdk.taches.getAll(metadatas);
    console.log(`Fetched ${tasks.datas.length} tasks for reporting`);
    
    return tasks.datas;
  } catch (error) {
    console.error("Error fetching tasks for reporting:", error);
    throw error;
  }
}

// Generate task completion report
function generateTaskCompletionReport(tasks) {
  // Calculate completion statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === "completed").length;
  const inProgressTasks = tasks.filter(task => task.status === "in_progress").length;
  const pendingTasks = tasks.filter(task => task.status === "pending").length;
  const cancelledTasks = tasks.filter(task => task.status === "cancelled").length;
  
  // Calculate completion rate
  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  
  // Group tasks by type
  const tasksByType = {};
  tasks.forEach(task => {
    const type = task.type_tache || "unknown";
    if (!tasksByType[type]) {
      tasksByType[type] = [];
    }
    tasksByType[type].push(task);
  });
  
  // Calculate completion rate by type
  const completionRateByType = {};
  Object.keys(tasksByType).forEach(type => {
    const typeTasks = tasksByType[type];
    const typeCompletedTasks = typeTasks.filter(task => task.status === "completed").length;
    completionRateByType[type] = typeTasks.length > 0 ? (typeCompletedTasks / typeTasks.length) * 100 : 0;
  });
  
  return {
    summary: {
      totalTasks,
      completedTasks,
      inProgressTasks,
      pendingTasks,
      cancelledTasks,
      completionRate: completionRate.toFixed(2) + "%"
    },
    byType: {
      taskCounts: Object.keys(tasksByType).reduce((acc, type) => {
        acc[type] = tasksByType[type].length;
        return acc;
      }, {}),
      completionRates: Object.keys(completionRateByType).reduce((acc, type) => {
        acc[type] = completionRateByType[type].toFixed(2) + "%";
        return acc;
      }, {})
    },
    rawData: tasks
  };
}

// Example usage in a reporting component
function TaskReportingComponent() {
  // State variables for date range and filters
  let startDate = new Date();
  startDate.setMonth(startDate.getMonth() - 1); // Default to last month
  let endDate = new Date();
  let filters = {
    type: null,
    status: null,
    location: null
  };
  
  // Generate report
  function generateReport() {
    fetchTasksForReporting(startDate, endDate, filters)
      .then(tasks => {
        const report = generateTaskCompletionReport(tasks);
        displayReport(report);
        
        // Example: Generate charts
        generateCompletionChart(report.summary);
        generateTypeDistributionChart(report.byType.taskCounts);
        generateCompletionRateByTypeChart(report.byType.completionRates);
      })
      .catch(error => {
        showErrorMessage("Failed to generate report");
      });
  }
  
  // Handle date range change
  function handleDateRangeChange(newStartDate, newEndDate) {
    startDate = newStartDate;
    endDate = newEndDate;
    generateReport();
  }
  
  // Handle filter change
  function handleFilterChange(newFilters) {
    filters = { ...filters, ...newFilters };
    generateReport();
  }
  
  // Initial report generation
  generateReport();
}
```

### Use Case 12: Analyzing Equipment Verification Status

**Scenario**: A quality manager needs to analyze the status of equipment verifications across different locations.

**Implementation**:

```typescript
import { VGSDK, SdkConfiguration, Metadatas } from "verifgood-js-sdk";

// Initialize SDK
const vgsdk = new VGSDK({
  apiBaseUrl: "https://symlab-v2.herokuapp.com/public/index.php",
  apiKey: "your-api-key"
});

// Fetch equipment with their verification tasks
async function fetchEquipmentWithVerifications() {
  try {
    // Fetch all equipment
    const equipmentMetadatas = new Metadatas();
    equipmentMetadatas.setLimit(0, 1000);
    const equipment = await vgsdk.equipements.getAll(equipmentMetadatas);
    
    // Fetch verification tasks
    const tasksMetadatas = new Metadatas();
    tasksMetadatas.setFilter("type_tache", "Verification_equipement", "equals");
    const tasks = await vgsdk.taches.getAll(tasksMetadatas);
    
    // Map tasks to equipment
    const equipmentWithVerifications = equipment.datas.map(equip => {
      const equipTasks = tasks.datas.filter(task => 
        task.equipment_id === equip.id
      );
      
      return {
        ...equip,
        verificationTasks: equipTasks,
        lastVerification: equipTasks.length > 0 
          ? equipTasks.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0]
          : null,
        verificationStatus: getVerificationStatus(equipTasks)
      };
    });
    
    return equipmentWithVerifications;
  } catch (error) {
    console.error("Error fetching equipment with verifications:", error);
    throw error;
  }
}

// Determine verification status based on tasks
function getVerificationStatus(tasks) {
  if (!tasks || tasks.length === 0) {
    return "never_verified";
  }
  
  // Sort tasks by date, newest first
  const sortedTasks = [...tasks].sort((a, b) => 
    new Date(b.created_at) - new Date(a.created_at)
  );
  
  const latestTask = sortedTasks[0];
  
  if (latestTask.status === "completed") {
    // Check if verification is recent (within last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    if (new Date(latestTask.completed_at) > thirtyDaysAgo) {
      return "recently_verified";
    } else {
      return "verification_outdated";
    }
  } else if (latestTask.status === "in_progress") {
    return "verification_in_progress";
  } else {
    return "verification_pending";
  }
}

// Generate equipment verification report
function generateEquipmentVerificationReport(equipmentList) {
  // Group by location
  const byLocation = {};
  equipmentList.forEach(equip => {
    const locationId = equip.location_id || "unknown";
    if (!byLocation[locationId]) {
      byLocation[locationId] = [];
    }
    byLocation[locationId].push(equip);
  });
  
  // Calculate statistics by location
  const locationStats = {};
  Object.keys(byLocation).forEach(locationId => {
    const locationEquipment = byLocation[locationId];
    
    // Count by status
    const statusCounts = {
      never_verified: 0,
      recently_verified: 0,
      verification_outdated: 0,
      verification_in_progress: 0,
      verification_pending: 0
    };
    
    locationEquipment.forEach(equip => {
      statusCounts[equip.verificationStatus]++;
    });
    
    // Calculate verification rate
    const totalEquipment = locationEquipment.length;
    const verifiedEquipment = statusCounts.recently_verified;
    const verificationRate = totalEquipment > 0 ? (verifiedEquipment / totalEquipment) * 100 : 0;
    
    locationStats[locationId] = {
      totalEquipment,
      statusCounts,
      verificationRate: verificationRate.toFixed(2) + "%"
    };
  });
  
  // Overall statistics
  const totalEquipment = equipmentList.length;
  const neverVerified = equipmentList.filter(e => e.verificationStatus === "never_verified").length;
  const recentlyVerified = equipmentList.filter(e => e.verificationStatus === "recently_verified").length;
  const outdated = equipmentList.filter(e => e.verificationStatus === "verification_outdated").length;
  const inProgress = equipmentList.filter(e => e.verificationStatus === "verification_in_progress").length;
  const pending = equipmentList.filter(e => e.verificationStatus === "verification_pending").length;
  
  const overallVerificationRate = totalEquipment > 0 ? (recentlyVerified / totalEquipment) * 100 : 0;
  
  return {
    summary: {
      totalEquipment,
      neverVerified,
      recentlyVerified,
      outdated,
      inProgress,
      pending,
      overallVerificationRate: overallVerificationRate.toFixed(2) + "%"
    },
    byLocation: locationStats,
    rawData: equipmentList
  };
}

// Example usage in an analytics dashboard
function EquipmentVerificationDashboard() {
  // Load equipment verification data
  loadEquipmentVerificationData();
  
  function loadEquipmentVerificationData() {
    fetchEquipmentWithVerifications()
      .then(equipmentList => {
        const report = generateEquipmentVerificationReport(equipmentList);
        
        // Display summary
        displaySummary(report.summary);
        
        // Display location breakdown
        displayLocationBreakdown(report.byLocation);
        
        // Generate charts
        generateVerificationStatusChart(report.summary);
        generateLocationComparisonChart(report.byLocation);
        
        // Display equipment that needs verification
        const needsVerification = equipmentList.filter(e => 
          e.verificationStatus === "never_verified" || 
          e.verificationStatus === "verification_outdated"
        );
        displayEquipmentNeedingVerification(needsVerification);
      })
      .catch(error => {
        showErrorMessage("Failed to load equipment verification data");
      });
  }
}
```

## Integration Scenarios

### Use Case 13: Integrating with a Mobile Inspection App

**Scenario**: A mobile app for field inspections needs to integrate with the Verifgood API to fetch tasks and submit checkpoint results.

**Implementation**:

```typescript
import { VGSDK, SdkConfiguration, Metadatas } from "verifgood-js-sdk";

// Initialize SDK
const vgsdk = new VGSDK({
  apiBaseUrl: "https://symlab-v2.herokuapp.com/public/index.php",
  apiKey: "your-api-key"
});

// Mobile app service for task management
class MobileInspectionService {
  // Fetch assigned tasks for a user
  async fetchAssignedTasks(userId) {
    try {
      const metadatas = new Metadatas();
      metadatas.setFilter("assigned_to", userId, "equals");
      metadatas.setFilter("status", ["pending", "in_progress"], "in");
      
      const tasks = await vgsdk.taches.getAll(metadatas);
      console.log(`Fetched ${tasks.datas.length} assigned tasks for user ${userId}`);
      
      // Fetch checkpoints for these tasks
      const taskIds = tasks.datas.map(task => task.id);
      
      if (taskIds.length === 0) {
        return { tasks: [] };
      }
      
      const checkpointsMetadatas = new Metadatas();
      checkpointsMetadatas.setFilter("idTache_id", taskIds, "in");
      
      const checkpoints = await vgsdk.checkpoints.getAll(checkpointsMetadatas);
      
      // Combine tasks with their checkpoints
      const tasksWithCheckpoints = tasks.datas.map(task => ({
        ...task,
        checkpoints: checkpoints.datas.filter(cp => cp.idTache_id === task.id)
      }));
      
      // Store in local storage for offline access
      this.storeTasksLocally(tasksWithCheckpoints);
      
      return { tasks: tasksWithCheckpoints };
    } catch (error) {
      console.error("Error fetching assigned tasks:", error);
      
      // If offline, try to get tasks from local storage
      if (this.isOffline()) {
        return { tasks: this.getLocallyStoredTasks(), offline: true };
      }
      
      throw error;
    }
  }
  
  // Update checkpoint status
  async updateCheckpointStatus(checkpointId, status, notes = null, attachments = []) {
    try {
      const updateData = {
        status: status,
        notes: notes
      };
      
      // Update checkpoint
      const result = await vgsdk.checkpoints.update(checkpointId, updateData);
      
      // If there are attachments, upload them
      if (attachments.length > 0) {
        for (const attachment of attachments) {
          await this.uploadAttachment(checkpointId, attachment);
        }
      }
      
      console.log(`Checkpoint ${checkpointId} updated successfully`);
      
      // Remove from pending updates if it was stored locally
      this.removePendingUpdate(checkpointId);
      
      return result;
    } catch (error) {
      console.error(`Error updating checkpoint ${checkpointId}:`, error);
      
      // If offline, store update for later sync
      if (this.isOffline()) {
        this.storePendingUpdate(checkpointId, {
          status,
          notes,
          attachments
        });
        return { offline: true, message: "Update stored for later synchronization" };
      }
      
      throw error;
    }
  }
  
  // Complete a task
  async completeTask(taskId, notes = null) {
    try {
      const updateData = {
        status: "completed",
        completed_at: new Date().toISOString(),
        notes: notes
      };
      
      const result = await vgsdk.taches.update(taskId, updateData);
      console.log(`Task ${taskId} marked as completed`);
      
      // Remove from pending updates if it was stored locally
      this.removePendingTaskUpdate(taskId);
      
      return result;
    } catch (error) {
      console.error(`Error completing task ${taskId}:`, error);
      
      // If offline, store update for later sync
      if (this.isOffline()) {
        this.storePendingTaskUpdate(taskId, {
          status: "completed",
          completed_at: new Date().toISOString(),
          notes
        });
        return { offline: true, message: "Update stored for later synchronization" };
      }
      
      throw error;
    }
  }
  
  // Synchronize offline changes when back online
  async synchronizeOfflineChanges() {
    if (this.isOffline()) {
      return { success: false, message: "Still offline" };
    }
    
    try {
      const pendingCheckpointUpdates = this.getPendingUpdates();
      const pendingTaskUpdates = this.getPendingTaskUpdates();
      
      console.log(`Synchronizing ${pendingCheckpointUpdates.length} checkpoint updates and ${pendingTaskUpdates.length} task updates`);
      
      // Process checkpoint updates
      for (const update of pendingCheckpointUpdates) {
        await this.updateCheckpointStatus(
          update.checkpointId,
          update.data.status,
          update.data.notes,
          update.data.attachments
        );
      }
      
      // Process task updates
      for (const update of pendingTaskUpdates) {
        await this.completeTask(
          update.taskId,
          update.data.notes
        );
      }
      
      return {
        success: true,
        checkpointsSynced: pendingCheckpointUpdates.length,
        tasksSynced: pendingTaskUpdates.length
      };
    } catch (error) {
      console.error("Error synchronizing offline changes:", error);
      throw error;
    }
  }
  
  // Helper methods for local storage
  isOffline() {
    return !navigator.onLine;
  }
  
  storeTasksLocally(tasks) {
    localStorage.setItem('offline_tasks', JSON.stringify(tasks));
  }
  
  getLocallyStoredTasks() {
    const tasksJson = localStorage.getItem('offline_tasks');
    return tasksJson ? JSON.parse(tasksJson) : [];
  }
  
  storePendingUpdate(checkpointId, data) {
    const updates = this.getPendingUpdates();
    updates.push({ checkpointId, data, timestamp: new Date().toISOString() });
    localStorage.setItem('pending_checkpoint_updates', JSON.stringify(updates));
  }
  
  getPendingUpdates() {
    const updatesJson = localStorage.getItem('pending_checkpoint_updates');
    return updatesJson ? JSON.parse(updatesJson) : [];
  }
  
  removePendingUpdate(checkpointId) {
    const updates = this.getPendingUpdates();
    const filteredUpdates = updates.filter(update => update.checkpointId !== checkpointId);
    localStorage.setItem('pending_checkpoint_updates', JSON.stringify(filteredUpdates));
  }
  
  storePendingTaskUpdate(taskId, data) {
    const updates = this.getPendingTaskUpdates();
    updates.push({ taskId, data, timestamp: new Date().toISOString() });
    localStorage.setItem('pending_task_updates', JSON.stringify(updates));
  }
  
  getPendingTaskUpdates() {
    const updatesJson = localStorage.getItem('pending_task_updates');
    return updatesJson ? JSON.parse(updatesJson) : [];
  }
  
  removePendingTaskUpdate(taskId) {
    const updates = this.getPendingTaskUpdates();
    const filteredUpdates = updates.filter(update => update.taskId !== taskId);
    localStorage.setItem('pending_task_updates', JSON.stringify(filteredUpdates));
  }
  
  // Upload attachment (photo, document, etc.)
  async uploadAttachment(checkpointId, attachment) {
    // Implementation would depend on how the API handles attachments
    console.log(`Uploading attachment for checkpoint ${checkpointId}`);
    // This is a placeholder - actual implementation would use the appropriate API endpoint
    return { success: true };
  }
}

// Example usage in a mobile app
function MobileInspectionApp() {
  const inspectionService = new MobileInspectionService();
  const currentUserId = "user123"; // Would come from authentication
  
  // Load tasks assigned to the current user
  async function loadAssignedTasks() {
    try {
      const { tasks, offline } = await inspectionService.fetchAssignedTasks(currentUserId);
      
      if (offline) {
        showOfflineIndicator();
      }
      
      displayTasks(tasks);
    } catch (error) {
      showErrorMessage("Failed to load tasks");
    }
  }
  
  // Update checkpoint status
  async function updateCheckpoint(checkpointId, status, notes, attachments) {
    try {
      const result = await inspectionService.updateCheckpointStatus(
        checkpointId,
        status,
        notes,
        attachments
      );
      
      if (result.offline) {
        showOfflineIndicator();
        showMessage("Changes saved locally and will sync when online");
      } else {
        showMessage("Checkpoint updated successfully");
      }
      
      // Refresh the task view
      loadAssignedTasks();
    } catch (error) {
      showErrorMessage("Failed to update checkpoint");
    }
  }
  
  // Complete a task
  async function completeTask(taskId, notes) {
    try {
      const result = await inspectionService.completeTask(taskId, notes);
      
      if (result.offline) {
        showOfflineIndicator();
        showMessage("Task completion saved locally and will sync when online");
      } else {
        showMessage("Task marked as completed");
      }
      
      // Refresh the task list
      loadAssignedTasks();
    } catch (error) {
      showErrorMessage("Failed to complete task");
    }
  }
  
  // Sync offline changes when back online
  async function syncOfflineChanges() {
    try {
      const result = await inspectionService.synchronizeOfflineChanges();
      
      if (result.success) {
        hideOfflineIndicator();
        showMessage(`Synchronized ${result.checkpointsSynced} checkpoints and ${result.tasksSynced} tasks`);
        
        // Refresh the task list
        loadAssignedTasks();
      } else {
        showMessage(result.message);
      }
    } catch (error) {
      showErrorMessage("Failed to synchronize offline changes");
    }
  }
  
  // Listen for online/offline events
  window.addEventListener('online', () => {
    showMessage("You are back online");
    syncOfflineChanges();
  });
  
  window.addEventListener('offline', () => {
    showOfflineIndicator();
    showMessage("You are offline. Changes will be saved locally.");
  });
  
  // Initial load
  loadAssignedTasks();
}
```

### Use Case 14: Integrating with a Dashboard Application

**Scenario**: A dashboard application needs to display real-time statistics and metrics from the Verifgood API.

**Implementation**:

```typescript
import { VGSDK, SdkConfiguration, Metadatas } from "verifgood-js-sdk";

// Initialize SDK
const vgsdk = new VGSDK({
  apiBaseUrl: "https://symlab-v2.herokuapp.com/public/index.php",
  apiKey: "your-api-key"
});

// Dashboard data service
class DashboardDataService {
  // Fetch summary statistics
  async fetchSummaryStatistics() {
    try {
      // Create promises for parallel API requests
      const promises = [
        this.fetchTaskStatistics(),
        this.fetchEquipmentStatistics(),
        this.fetchLocationStatistics(),
        this.fetchUserStatistics()
      ];
      
      // Wait for all promises to resolve
      const [taskStats, equipmentStats, locationStats, userStats] = await Promise.all(promises);
      
      return {
        tasks: taskStats,
        equipment: equipmentStats,
        locations: locationStats,
        users: userStats
      };
    } catch (error) {
      console.error("Error fetching summary statistics:", error);
      throw error;
    }
  }
  
  // Fetch task statistics
  async fetchTaskStatistics() {
    const metadatas = new Metadatas();
    metadatas.setLimit(0, 1000);
    
    const tasks = await vgsdk.taches.getAll(metadatas);
    
    // Calculate statistics
    const totalTasks = tasks.datas.length;
    const completedTasks = tasks.datas.filter(task => task.status === "completed").length;
    const inProgressTasks = tasks.datas.filter(task => task.status === "in_progress").length;
    const pendingTasks = tasks.datas.filter(task => task.status === "pending").length;
    
    // Tasks by type
    const tasksByType = {};
    tasks.datas.forEach(task => {
      const type = task.type_tache || "unknown";
      if (!tasksByType[type]) {
        tasksByType[type] = 0;
      }
      tasksByType[type]++;
    });
    
    // Recent tasks (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const recentTasks = tasks.datas.filter(task => 
      new Date(task.created_at) >= sevenDaysAgo
    );
    
    return {
      total: totalTasks,
      completed: completedTasks,
      inProgress: inProgressTasks,
      pending: pendingTasks,
      completionRate: totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0,
      byType: tasksByType,
      recent: recentTasks.length
    };
  }
  
  // Fetch equipment statistics
  async fetchEquipmentStatistics() {
    const metadatas = new Metadatas();
    metadatas.setLimit(0, 1000);
    
    const equipment = await vgsdk.equipements.getAll(metadatas);
    
    // Calculate statistics
    const totalEquipment = equipment.datas.length;
    
    // Equipment by category
    const equipmentByCategory = {};
    equipment.datas.forEach(equip => {
      const category = equip.category_id || "unknown";
      if (!equipmentByCategory[category]) {
        equipmentByCategory[category] = 0;
      }
      equipmentByCategory[category]++;
    });
    
    // Equipment by status
    const equipmentByStatus = {};
    equipment.datas.forEach(equip => {
      const status = equip.status || "unknown";
      if (!equipmentByStatus[status]) {
        equipmentByStatus[status] = 0;
      }
      equipmentByStatus[status]++;
    });
    
    return {
      total: totalEquipment,
      byCategory: equipmentByCategory,
      byStatus: equipmentByStatus
    };
  }
  
  // Fetch location statistics
  async fetchLocationStatistics() {
    const metadatas = new Metadatas();
    metadatas.setLimit(0, 1000);
    
    const locations = await vgsdk.lieux.getAll(metadatas);
    
    // Calculate statistics
    const totalLocations = locations.datas.length;
    
    // Root locations (no parent)
    const rootLocations = locations.datas.filter(location => !location.parent_id).length;
    
    // Locations by type
    const locationsByType = {};
    locations.datas.forEach(location => {
      const type = location.type || "unknown";
      if (!locationsByType[type]) {
        locationsByType[type] = 0;
      }
      locationsByType[type]++;
    });
    
    return {
      total: totalLocations,
      rootLocations: rootLocations,
      byType: locationsByType
    };
  }
  
  // Fetch user statistics (this would depend on how users are stored in the API)
  async fetchUserStatistics() {
    // This is a placeholder - actual implementation would depend on the API
    return {
      total: 0,
      active: 0,
      byRole: {}
    };
  }
  
  // Fetch recent activity
  async fetchRecentActivity(limit = 10) {
    try {
      // Fetch recent tasks
      const tasksMetadatas = new Metadatas();
      tasksMetadatas.setLimit(0, limit);
      // Sort by created_at descending
      // Note: This assumes the API supports sorting, which might not be the case
      // In a real implementation, you might need to fetch all and sort client-side
      
      const tasks = await vgsdk.taches.getAll(tasksMetadatas);
      
      // Sort tasks by created_at (newest first)
      const sortedTasks = [...tasks.datas].sort((a, b) => 
        new Date(b.created_at) - new Date(a.created_at)
      );
      
      // Format activities
      const activities = sortedTasks.map(task => ({
        type: "task_created",
        entityId: task.id,
        entityType: "task",
        entityName: task.name,
        timestamp: task.created_at,
        details: {
          taskType: task.type_tache,
          status: task.status
        }
      }));
      
      return activities.slice(0, limit);
    } catch (error) {
      console.error("Error fetching recent activity:", error);
      throw error;
    }
  }
}

// Example usage in a dashboard application
function DashboardApplication() {
  const dashboardService = new DashboardDataService();
  
  // Load dashboard data
  async function loadDashboardData() {
    try {
      // Fetch summary statistics
      const summaryStats = await dashboardService.fetchSummaryStatistics();
      
      // Display statistics in dashboard widgets
      displayTaskStatistics(summaryStats.tasks);
      displayEquipmentStatistics(summaryStats.equipment);
      displayLocationStatistics(summaryStats.locations);
      displayUserStatistics(summaryStats.users);
      
      // Generate charts
      generateTaskCompletionChart(summaryStats.tasks);
      generateEquipmentCategoryChart(summaryStats.equipment);
      generateTaskTypeDistributionChart(summaryStats.tasks);
      
      // Fetch and display recent activity
      const recentActivity = await dashboardService.fetchRecentActivity(5);
      displayRecentActivity(recentActivity);
    } catch (error) {
      showErrorMessage("Failed to load dashboard data");
    }
  }
  
  // Set up auto-refresh
  function setupAutoRefresh(intervalMinutes = 5) {
    setInterval(() => {
      loadDashboardData();
    }, intervalMinutes * 60 * 1000);
  }
  
  // Initial load
  loadDashboardData();
  
  // Set up auto-refresh every 5 minutes
  setupAutoRefresh(5);
}
```

### Use Case 15: Integrating with a Third-Party System

**Scenario**: A third-party system needs to synchronize data with the Verifgood API.

**Implementation**:

```typescript
import { VGSDK, SdkConfiguration, Metadatas } from "verifgood-js-sdk";

// Initialize SDK
const vgsdk = new VGSDK({
  apiBaseUrl: "https://symlab-v2.herokuapp.com/public/index.php",
  apiKey: "your-api-key"
});

// Integration service for third-party system
class ThirdPartyIntegrationService {
  constructor(thirdPartyApiUrl, thirdPartyApiKey) {
    this.thirdPartyApiUrl = thirdPartyApiUrl;
    this.thirdPartyApiKey = thirdPartyApiKey;
  }
  
  // Synchronize equipment data from third-party system to Verifgood
  async syncEquipmentFromThirdParty() {
    try {
      // Fetch equipment from third-party system
      const thirdPartyEquipment = await this.fetchEquipmentFromThirdParty();
      
      // Fetch existing equipment from Verifgood
      const existingEquipment = await this.fetchExistingEquipment();
      
      // Create a map of existing equipment by external ID for quick lookup
      const existingEquipmentMap = {};
      existingEquipment.forEach(equip => {
        if (equip.external_id) {
          existingEquipmentMap[equip.external_id] = equip;
        }
      });
      
      // Process each equipment from third-party
      const results = {
# VerifgoodSDK Use Cases

This document outlines common use cases for the VerifgoodSDK, demonstrating how it can be integrated into various applications and workflows.

## Table of Contents

1. [User Management](#user-management)
2. [Category Management](#category-management)
3. [Task Management](#task-management)
4. [Equipment Management](#equipment-management)
5. [Location Management](#location-management)
6. [Checkpoint Management](#checkpoint-management)
7. [Reporting and Analytics](#reporting-and-analytics)
8. [Integration Scenarios](#integration-scenarios)

## User Management

### Use Case 1: User Invitation and Registration

**Scenario**: An administrator needs to invite new users to the Verifgood platform and manage their registration process.

**Implementation**:

```typescript
import { VGSDK, SdkConfiguration } from "verifgood-js-sdk";
import { InvitationRequest } from "verifgood-js-sdk";

// Initialize SDK
const vgsdk = new VGSDK({
  apiBaseUrl: "https://symlab-v2.herokuapp.com/public/index.php",
  apiKey: "your-api-key"
});

// Step 1: Generate invitation for a new user
async function inviteUser(email: string, role: string) {
  try {
    const invitationRequest: InvitationRequest = { email, role };
    const invitation = await vgsdk.invitations.generateInvitationLink(invitationRequest);
    
    console.log(`Invitation created for ${email}`);
    console.log(`Invitation token: ${invitation.token}`);
    
    // In a real application, you would send this invitation link to the user via email
    const invitationLink = `https://your-app.com/register?token=${invitation.token}`;
    console.log(`Invitation link: ${invitationLink}`);
    
    return invitation;
  } catch (error) {
    console.error("Error creating invitation:", error);
    throw error;
  }
}

// Example usage
inviteUser("newuser@example.com", "ROLE_ADMIN")
  .then(invitation => {
    console.log("Invitation process completed");
  })
  .catch(error => {
    console.error("Invitation process failed:", error);
  });
```

### Use Case 2: Validating User Invitations

**Scenario**: When a user clicks on an invitation link, the application needs to validate the invitation token.

**Implementation**:

```typescript
import { VGSDK, SdkConfiguration } from "verifgood-js-sdk";
import { InvitationCard } from "verifgood-js-sdk";

// Initialize SDK
const vgsdk = new VGSDK({
  apiBaseUrl: "https://symlab-v2.herokuapp.com/public/index.php",
  apiKey: "your-api-key"
});

// Validate an invitation token when a user clicks the link
async function validateInvitation(token: string) {
  try {
    const invitationToCheck: InvitationCard = {
      token: token,
      origin: window.location.origin,
      email: "" // Email can be empty as the token is sufficient
    };
    
    const validatedInvitation = await vgsdk.invitations.checkInvitation(invitationToCheck);
    
    if (validatedInvitation.status === "error") {
      console.error("Invalid invitation token");
      return null;
    }
    
    console.log("Invitation is valid:", validatedInvitation);
    return validatedInvitation;
  } catch (error) {
    console.error("Error validating invitation:", error);
    throw error;
  }
}

// Example usage in a registration page component
function RegistrationPage() {
  // Extract token from URL query parameters
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');
  
  if (token) {
    validateInvitation(token)
      .then(invitation => {
        if (invitation) {
          // Show registration form with email pre-filled
          showRegistrationForm(invitation.email);
        } else {
          // Show error message
          showErrorMessage("Invalid invitation link");
        }
      })
      .catch(error => {
        showErrorMessage("Error validating invitation");
      });
  } else {
    showErrorMessage("No invitation token provided");
  }
}
```

### Use Case 3: Completing User Registration

**Scenario**: After validating an invitation, the user needs to complete their registration by setting a password.

**Implementation**:

```typescript
import { VGSDK, SdkConfiguration } from "verifgood-js-sdk";
import { InvitationCompleteRegistration } from "verifgood-js-sdk";

// Initialize SDK
const vgsdk = new VGSDK({
  apiBaseUrl: "https://symlab-v2.herokuapp.com/public/index.php",
  apiKey: "your-api-key"
});

// Complete the registration process
async function completeRegistration(token: string, password: string, passwordConfirm: string) {
  try {
    // Validate password requirements
    if (password.length < 8) {
      throw new Error("Password must be at least 8 characters long");
    }
    
    if (password !== passwordConfirm) {
      throw new Error("Passwords do not match");
    }
    
    const registrationData: InvitationCompleteRegistration = {
      invitation_token: token,
      password: password,
      password_confirm: passwordConfirm
    };
    
    const result = await vgsdk.invitations.completeRegistration(registrationData);
    console.log("Registration completed successfully:", result);
    
    // In a real application, you would redirect to login page or dashboard
    return result;
  } catch (error) {
    console.error("Error completing registration:", error);
    throw error;
  }
}

// Example usage in a registration form submission handler
function handleRegistrationSubmit(event) {
  event.preventDefault();
  
  const token = document.getElementById('token').value;
  const password = document.getElementById('password').value;
  const passwordConfirm = document.getElementById('password-confirm').value;
  
  completeRegistration(token, password, passwordConfirm)
    .then(result => {
      showSuccessMessage("Registration completed successfully!");
      redirectToLogin();
    })
    .catch(error => {
      showErrorMessage(error.message);
    });
}
```

## Category Management

### Use Case 4: Retrieving and Displaying Categories

**Scenario**: An application needs to display a list of categories with filtering and pagination.

**Implementation**:

```typescript
import { VGSDK, SdkConfiguration, Metadatas } from "verifgood-js-sdk";

// Initialize SDK
const vgsdk = new VGSDK({
  apiBaseUrl: "https://symlab-v2.herokuapp.com/public/index.php",
  apiKey: "your-api-key"
});

// Fetch categories with filtering and pagination
async function fetchCategories(page = 0, pageSize = 10, filter = null) {
  try {
    const metadatas = new Metadatas();
    
    // Set pagination
    const offset = page * pageSize;
    metadatas.setLimit(offset, pageSize);
    
    // Apply filter if provided
    if (filter) {
      if (filter.tag) {
        metadatas.setFilter("tags", filter.tag, "equals");
      }
      if (filter.name) {
        metadatas.setFilter("name", filter.name, "contains");
      }
    }
    
    const categories = await vgsdk.categories.getAll(metadatas);
    console.log(`Fetched ${categories.datas.length} categories`);
    
    return {
      items: categories.datas,
      total: categories.total || categories.datas.length,
      page: page,
      pageSize: pageSize
    };
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}

// Example usage in a category listing component
function CategoryListingComponent() {
  // State variables for current page, page size, and filter
  let currentPage = 0;
  let pageSize = 10;
  let currentFilter = { tag: null, name: null };
  
  // Initial load
  loadCategories();
  
  // Load categories with current pagination and filter
  function loadCategories() {
    fetchCategories(currentPage, pageSize, currentFilter)
      .then(result => {
        displayCategories(result.items);
        updatePagination(result.page, result.pageSize, result.total);
      })
      .catch(error => {
        showErrorMessage("Failed to load categories");
      });
  }
  
  // Handle filter change
  function handleFilterChange(newFilter) {
    currentFilter = newFilter;
    currentPage = 0; // Reset to first page when filter changes
    loadCategories();
  }
  
  // Handle page change
  function handlePageChange(newPage) {
    currentPage = newPage;
    loadCategories();
  }
}
```

### Use Case 5: Creating and Updating Categories

**Scenario**: An administrator needs to create new categories and update existing ones.

**Implementation**:

```typescript
import { VGSDK, SdkConfiguration } from "verifgood-js-sdk";

// Initialize SDK
const vgsdk = new VGSDK({
  apiBaseUrl: "https://symlab-v2.herokuapp.com/public/index.php",
  apiKey: "your-api-key"
});

// Create a new category
async function createCategory(categoryData) {
  try {
    const result = await vgsdk.categories.create(categoryData);
    console.log("Category created successfully:", result);
    return result;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
}

// Update an existing category
async function updateCategory(categoryId, categoryData) {
  try {
    const result = await vgsdk.categories.update(categoryId, categoryData);
    console.log(`Category ${categoryId} updated successfully:`, result);
    return result;
  } catch (error) {
    console.error(`Error updating category ${categoryId}:`, error);
    throw error;
  }
}

// Example usage in a category form component
function CategoryFormComponent(categoryId = null) {
  // If categoryId is provided, we're updating an existing category
  // Otherwise, we're creating a new one
  
  // Load existing category data if updating
  if (categoryId) {
    vgsdk.categories.getById(categoryId)
      .then(category => {
        populateForm(category);
      })
      .catch(error => {
        showErrorMessage(`Failed to load category ${categoryId}`);
      });
  }
  
  // Handle form submission
  function handleSubmit(formData) {
    if (categoryId) {
      // Update existing category
      updateCategory(categoryId, formData)
        .then(result => {
          showSuccessMessage("Category updated successfully");
          redirectToCategoryList();
        })
        .catch(error => {
          showErrorMessage("Failed to update category");
        });
    } else {
      // Create new category
      createCategory(formData)
        .then(result => {
          showSuccessMessage("Category created successfully");
          redirectToCategoryList();
        })
        .catch(error => {
          showErrorMessage("Failed to create category");
        });
    }
  }
}
```

## Task Management

### Use Case 6: Retrieving Tasks with Their Checkpoints

**Scenario**: An application needs to display tasks along with their associated checkpoints.

**Implementation**:

```typescript
import { VGSDK, SdkConfiguration, Metadatas } from "verifgood-js-sdk";

// Initialize SDK
const vgsdk = new VGSDK({
  apiBaseUrl: "https://symlab-v2.herokuapp.com/public/index.php",
  apiKey: "your-api-key"
});

// Fetch tasks with their checkpoints
async function fetchTasksWithCheckpoints(taskType = null) {
  try {
    // Create metadata for tasks query
    const tachesMetadatas = new Metadatas();
    tachesMetadatas.setLimit(0, 25);
    
    // Apply task type filter if provided
    if (taskType) {
      tachesMetadatas.setFilter("type_tache", taskType, "equals");
    }
    
    // Get tasks
    const taches = await vgsdk.taches.getAll(tachesMetadatas);
    console.log(`Fetched ${taches.datas.length} tasks`);
    
    // If no tasks found, return empty result
    if (!taches.datas || taches.datas.length === 0) {
      return { tasks: [] };
    }
    
    // Extract task IDs
    const tacheIds = taches.datas.map(tache => tache.id);
    
    // Create metadata for checkpoints query
    const checkpointsMetadatas = new Metadatas();
    checkpointsMetadatas.setFilter("idTache_id", tacheIds, "equals");
    
    // Get checkpoints
    const checkpoints = await vgsdk.checkpoints.getAll(checkpointsMetadatas);
    console.log(`Fetched ${checkpoints.datas.length} checkpoints`);
    
    // Combine tasks with their checkpoints
    taches.datas.forEach(tache => {
      tache.checkpoints = checkpoints.datas.filter(checkpoint => 
        checkpoint.idTache_id === tache.id
      );
    });
    
    return { tasks: taches.datas };
  } catch (error) {
    console.error("Error fetching tasks with checkpoints:", error);
    throw error;
  }
}

// Example usage in a task dashboard component
function TaskDashboardComponent() {
  // Load tasks for a specific type
  loadTasksWithCheckpoints("Verification_equipement");
  
  function loadTasksWithCheckpoints(taskType) {
    fetchTasksWithCheckpoints(taskType)
      .then(result => {
        displayTasks(result.tasks);
      })
      .catch(error => {
        showErrorMessage("Failed to load tasks");
      });
  }
  
  // Handle task type filter change
  function handleTaskTypeChange(newTaskType) {
    loadTasksWithCheckpoints(newTaskType);
  }
}
```

### Use Case 7: Creating and Assigning Tasks

**Scenario**: A manager needs to create new tasks and assign them to specific locations or equipment.

**Implementation**:

```typescript
import { VGSDK, SdkConfiguration } from "verifgood-js-sdk";

// Initialize SDK
const vgsdk = new VGSDK({
  apiBaseUrl: "https://symlab-v2.herokuapp.com/public/index.php",
  apiKey: "your-api-key"
});

// Create a new task
async function createTask(taskData) {
  try {
    const result = await vgsdk.taches.create(taskData);
    console.log("Task created successfully:", result);
    return result;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
}

// Create checkpoints for a task
async function createCheckpointsForTask(taskId, checkpointsData) {
  try {
    const createdCheckpoints = [];
    
    // Create each checkpoint
    for (const checkpointData of checkpointsData) {
      // Add task ID to checkpoint data
      checkpointData.idTache_id = taskId;
      
      // Create checkpoint
      const result = await vgsdk.checkpoints.create(checkpointData);
      createdCheckpoints.push(result);
    }
    
    console.log(`Created ${createdCheckpoints.length} checkpoints for task ${taskId}`);
    return createdCheckpoints;
  } catch (error) {
    console.error(`Error creating checkpoints for task ${taskId}:`, error);
    throw error;
  }
}

// Example usage in a task creation form
function TaskCreationForm() {
  // Handle form submission
  async function handleSubmit(formData) {
    try {
      // Extract task data and checkpoints data from form
      const { taskData, checkpointsData } = extractFormData(formData);
      
      // Create task
      const taskResult = await createTask(taskData);
      const taskId = taskResult.id;
      
      // Create checkpoints for the task
      await createCheckpointsForTask(taskId, checkpointsData);
      
      showSuccessMessage("Task created successfully with checkpoints");
      redirectToTaskList();
    } catch (error) {
      showErrorMessage("Failed to create task");
    }
  }
  
  // Helper function to extract task and checkpoints data from form
  function extractFormData(formData) {
    // Extract task data
    const taskData = {
      name: formData.taskName,
      description: formData.taskDescription,
      type_tache: formData.taskType,
      // Other task fields...
    };
    
    // Extract checkpoints data
    const checkpointsData = formData.checkpoints.map(checkpoint => ({
      name: checkpoint.name,
      description: checkpoint.description,
      // Other checkpoint fields...
    }));
    
    return { taskData, checkpointsData };
  }
}
```

## Equipment Management

### Use Case 8: Managing Equipment Inventory

**Scenario**: A facility manager needs to maintain an inventory of equipment with filtering and search capabilities.

**Implementation**:

```typescript
import { VGSDK, SdkConfiguration, Metadatas } from "verifgood-js-sdk";

// Initialize SDK
const vgsdk = new VGSDK({
  apiBaseUrl: "https://symlab-v2.herokuapp.com/public/index.php",
  apiKey: "your-api-key"
});

// Fetch equipment with filtering and search
async function fetchEquipment(page = 0, pageSize = 10, filters = {}) {
  try {
    const metadatas = new Metadatas();
    
    // Set pagination
    const offset = page * pageSize;
    metadatas.setLimit(offset, pageSize);
    
    // Apply filters
    if (filters.name) {
      metadatas.setFilter("name", filters.name, "contains");
    }
    
    if (filters.category) {
      metadatas.setFilter("category_id", filters.category, "equals");
    }
    
    if (filters.location) {
      metadatas.setFilter("location_id", filters.location, "equals");
    }
    
    if (filters.status) {
      metadatas.setFilter("status", filters.status, "equals");
    }
    
    // Fetch equipment
    const equipment = await vgsdk.equipements.getAll(metadatas);
    console.log(`Fetched ${equipment.datas.length} equipment items`);
    
    return {
      items: equipment.datas,
      total: equipment.total || equipment.datas.length,
      page: page,
      pageSize: pageSize
    };
  } catch (error) {
    console.error("Error fetching equipment:", error);
    throw error;
  }
}

// Add new equipment
async function addEquipment(equipmentData) {
  try {
    const result = await vgsdk.equipements.create(equipmentData);
    console.log("Equipment added successfully:", result);
    return result;
  } catch (error) {
    console.error("Error adding equipment:", error);
    throw error;
  }
}

// Update equipment
async function updateEquipment(equipmentId, equipmentData) {
  try {
    const result = await vgsdk.equipements.update(equipmentId, equipmentData);
    console.log(`Equipment ${equipmentId} updated successfully:`, result);
    return result;
  } catch (error) {
    console.error(`Error updating equipment ${equipmentId}:`, error);
    throw error;
  }
}

// Example usage in an equipment management component
function EquipmentManagementComponent() {
  // State variables
  let currentPage = 0;
  let pageSize = 10;
  let currentFilters = {
    name: null,
    category: null,
    location: null,
    status: null
  };
  
  // Initial load
  loadEquipment();
  
  // Load equipment with current pagination and filters
  function loadEquipment() {
    fetchEquipment(currentPage, pageSize, currentFilters)
      .then(result => {
        displayEquipment(result.items);
        updatePagination(result.page, result.pageSize, result.total);
      })
      .catch(error => {
        showErrorMessage("Failed to load equipment");
      });
  }
  
  // Handle filter change
  function handleFilterChange(newFilters) {
    currentFilters = { ...currentFilters, ...newFilters };
    currentPage = 0; // Reset to first page when filters change
    loadEquipment();
  }
  
  // Handle equipment form submission (add/update)
  function handleEquipmentFormSubmit(formData, equipmentId = null) {
    if (equipmentId) {
      // Update existing equipment
      updateEquipment(equipmentId, formData)
        .then(result => {
          showSuccessMessage("Equipment updated successfully");
          loadEquipment(); // Reload the list
        })
        .catch(error => {
          showErrorMessage("Failed to update equipment");
        });
    } else {
      // Add new equipment
      addEquipment(formData)
        .then(result => {
          showSuccessMessage("Equipment added successfully");
          loadEquipment(); // Reload the list
        })
        .catch(error => {
          showErrorMessage("Failed to add equipment");
        });
    }
  }
}
```

## Location Management

### Use Case 9: Managing Locations and Hierarchies

**Scenario**: A facility manager needs to manage locations and their hierarchical relationships.

**Implementation**:

```typescript
import { VGSDK, SdkConfiguration, Metadatas } from "verifgood-js-sdk";

// Initialize SDK
const vgsdk = new VGSDK({
  apiBaseUrl: "https://symlab-v2.herokuapp.com/public/index.php",
  apiKey: "your-api-key"
});

// Fetch all locations
async function fetchAllLocations() {
  try {
    const metadatas = new Metadatas();
    const locations = await vgsdk.lieux.getAll(metadatas);
    console.log(`Fetched ${locations.datas.length} locations`);
    return locations.datas;
  } catch (error) {
    console.error("Error fetching locations:", error);
    throw error;
  }
}

// Build location hierarchy
function buildLocationHierarchy(locations) {
  // Create a map of locations by ID for quick lookup
  const locationsMap = {};
  locations.forEach(location => {
    locationsMap[location.id] = {
      ...location,
      children: []
    };
  });
  
  // Build the hierarchy
  const rootLocations = [];
  
  locations.forEach(location => {
    const locationWithChildren = locationsMap[location.id];
    
    if (location.parent_id && locationsMap[location.parent_id]) {
      // This location has a parent, add it as a child of the parent
      locationsMap[location.parent_id].children.push(locationWithChildren);
    } else {
      // This is a root location
      rootLocations.push(locationWithChildren);
    }
  });
  
  return rootLocations;
}

