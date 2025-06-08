# Restaurant & Online Ordering Integration for Allergy Detection System

## Database Schema Enhancement

### Menu Item Interface

```typescript
interface MenuItem {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  allergen_warnings: string[];
  preparation_notes: string;
  cross_contamination_risk: 'low' | 'medium' | 'high';
  dietary_tags: string[]; // 'vegan', 'gluten-free', etc.
}

interface MenuAnalysis {
  menu_item: MenuItem;
  safety_assessment: AllergyResult;
  confidence_score: number;
  recommendations: string[];
}
```

## API Enhancement

### New Menu Analysis Endpoint

```typescript
// New endpoint: /api/analyze-menu
export async function POST(request: Request) {
  const { userAllergies, menuItem, photoData } = await request.json();

  // Combine menu data with photo analysis
  const [menuAnalysis, photoAnalysis] = await Promise.all([
    analyzeMenuItemText(menuItem, userAllergies),
    photoData ? analyzePhoto(photoData, userAllergies) : null,
  ]);

  // Cross-reference and validate findings
  const combinedAnalysis = reconcileAnalyses(menuAnalysis, photoAnalysis);

  return Response.json(combinedAnalysis);
}
```

## Restaurant Implementation

### Restaurant Dashboard Component

```typescript
// Restaurant dashboard component
function RestaurantAllergyDashboard() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  // Bulk analyze menu for common allergens
  const analyzeFullMenu = async () => {
    const analyses = await Promise.all(
      menuItems.map(item =>
        fetch('/api/analyze-menu', {
          method: 'POST',
          body: JSON.stringify({
            menuItem: item,
            userAllergies: COMMON_ALLERGENS,
          }),
        })
      )
    );

    // Generate allergen-friendly menu variants
    return createAllergenFriendlyMenus(analyses);
  };
}
```

## Online Ordering Platform Implementation

### Customer-Facing Allergy-Aware Menu

```typescript
// Customer-facing menu with real-time filtering
function AllergyAwareMenu({ userAllergies }: { userAllergies: string[] }) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<MenuAnalysis[]>([]);

  useEffect(() => {
    // Real-time filtering as user types allergies
    const analyzeMenuForUser = async () => {
      const results = await Promise.all(
        menuItems.map(item => analyzeMenuItem(item, userAllergies))
      );

      // Sort by safety: safe → warning → unsafe
      const sorted = results.sort((a, b) =>
        getSafetyScore(a) - getSafetyScore(b)
      );

      setFilteredItems(sorted);
    };

    if (userAllergies.length > 0) {
      analyzeMenuForUser();
    }
  }, [userAllergies, menuItems]);

  return (
    <div className="menu-grid">
      {filteredItems.map(analysis => (
        <MenuItemCard
          key={analysis.menu_item.id}
          analysis={analysis}
          onPhotoUpload={(photo) =>
            // Allow customers to upload photos for verification
            verifyMenuItemWithPhoto(analysis.menu_item, photo, userAllergies)
          }
        />
      ))}
    </div>
  );
}
```

## Enhanced Menu Item Card Component

### Interactive Menu Item with Photo Verification

```typescript
function MenuItemCard({ analysis }: { analysis: MenuAnalysis }) {
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [photoAnalysis, setPhotoAnalysis] = useState<AllergyResult | null>(null);

  const handlePhotoVerification = async (photo: string) => {
    const result = await fetch('/api/analyze', {
      method: 'POST',
      body: JSON.stringify({
        image: photo,
        userAllergies: analysis.safety_assessment.detected_allergens
      })
    });

    const photoResult = await result.json();
    setPhotoAnalysis(photoResult);

    // Show comparison between menu description and actual photo
    if (hasDiscrepancy(analysis.safety_assessment, photoResult)) {
      // Alert user to potential differences
      showDiscrepancyWarning(analysis, photoResult);
    }
  };

  return (
    <Card className={`menu-item ${getSafetyClass(analysis.safety_assessment)}`}>
      <CardContent>
        <h3>{analysis.menu_item.name}</h3>
        <p>{analysis.menu_item.description}</p>

        {/* Safety indicator */}
        <SafetyBadge assessment={analysis.safety_assessment} />

        {/* Ingredient breakdown */}
        <IngredientList
          ingredients={analysis.menu_item.ingredients}
          safetyData={analysis.safety_assessment}
        />

        {/* Photo verification option */}
        <div className="photo-verification">
          <h4>Verify with Photo</h4>
          <ImageUpload onImageUpload={handlePhotoVerification} />

          {photoAnalysis && (
            <PhotoVerificationResults
              menuAnalysis={analysis.safety_assessment}
              photoAnalysis={photoAnalysis}
            />
          )}
        </div>

        {/* Confidence and recommendations */}
        <div className="recommendations">
          <p>Confidence: {analysis.confidence_score}%</p>
          {analysis.recommendations.map((rec, i) => (
            <Alert key={i} severity="info">{rec}</Alert>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
```

## Real-Time Features

### WebSocket Menu Updates

```typescript
// WebSocket integration for live menu updates
function useMenuUpdates(restaurantId: string) {
  useEffect(() => {
    const ws = new WebSocket(`/api/menu-updates/${restaurantId}`);

    ws.onmessage = event => {
      const { type, data } = JSON.parse(event.data);

      switch (type) {
        case 'ingredient_change':
          // Re-analyze affected menu items
          reanalyzeMenuItem(data.menuItemId);
          break;
        case 'new_allergen_alert':
          // Alert users with matching allergies
          notifyAffectedUsers(data.allergen);
          break;
      }
    };
  }, [restaurantId]);
}
```

## QR Code Integration

### QR Code Menu System

```typescript
// Generate QR codes that include allergy data
function generateAllergyAwareQR(menuItem: MenuItem, tableId: string) {
  const qrData = {
    menuItemId: menuItem.id,
    tableId,
    allergenData: menuItem.allergen_warnings,
    timestamp: Date.now()
  };

  return generateQRCode(qrData);
}

// Scan QR and get personalized view
function QRMenuScanner({ userAllergies }: { userAllergies: string[] }) {
  const handleQRScan = async (qrData: any) => {
    const menuItem = await fetchMenuItem(qrData.menuItemId);
    const analysis = await analyzeMenuItem(menuItem, userAllergies);

    // Show personalized safety assessment
    showPersonalizedMenuView(analysis);
  };

  return <QRCodeScanner onScan={handleQRScan} />;
}
```

## Business Implementation Strategy

### For Restaurant Partners

1. **Menu Digitization**

   - Convert existing menus to structured data
   - Include detailed ingredient lists and preparation methods
   - Add cross-contamination risk assessments

2. **Staff Training**

   - Train kitchen staff on cross-contamination protocols
   - Implement allergen handling procedures
   - Create incident response workflows

3. **Real-time Updates**

   - System to update menu when ingredients change
   - Notification system for supply chain changes
   - Daily allergen status checks

4. **Analytics Dashboard**
   - Track allergen-related inquiries and incidents
   - Monitor customer safety feedback
   - Generate compliance reports

### For Delivery Platforms

1. **Restaurant Onboarding**

   - Provide tools for restaurants to input detailed ingredient data
   - Standardize allergen reporting across partners
   - Implement verification processes

2. **Customer Profiles**

   - Store user allergy profiles for seamless ordering
   - Provide allergy management dashboard
   - Enable emergency contact information

3. **Photo Verification**

   - Allow customers to upload photos of received food
   - Compare actual food to menu descriptions
   - Flag discrepancies for restaurant follow-up

4. **Incident Reporting**
   - System to report and track allergen-related issues
   - Integration with health authorities when required
   - Feedback loop to improve restaurant practices

## Implementation Benefits

### For Customers

- **Enhanced Safety**: Multi-layer verification (menu + photo)
- **Personalized Experience**: Customized menu based on allergies
- **Real-time Updates**: Immediate alerts for menu changes
- **Confidence**: Photo verification reduces uncertainty

### For Restaurants

- **Risk Reduction**: Fewer allergen-related incidents
- **Customer Trust**: Transparent allergen information
- **Operational Efficiency**: Standardized allergen protocols
- **Competitive Advantage**: Appeal to allergy-conscious diners

### For Platforms

- **Market Differentiation**: First-to-market allergy safety features
- **User Retention**: Essential tool for allergic customers
- **Data Insights**: Understanding of dietary restrictions trends
- **Regulatory Compliance**: Proactive safety measures

## Technical Architecture

### Data Flow

1. **Menu Ingestion**: Restaurant uploads menu with ingredient data
2. **AI Analysis**: System analyzes menu items for common allergens
3. **Customer Input**: User enters personal allergy information
4. **Real-time Filtering**: Menu filtered based on user allergies
5. **Photo Verification**: Optional photo upload for verification
6. **Cross-reference**: Compare menu data with photo analysis
7. **Safety Assessment**: Generate comprehensive safety report

### Integration Points

- **POS Systems**: Direct integration with restaurant point-of-sale
- **Inventory Management**: Real-time ingredient availability
- **Delivery APIs**: Integration with major delivery platforms
- **Health Systems**: Optional integration with medical records
- **Emergency Services**: Quick access to emergency contacts

This comprehensive system would create a safer, more inclusive dining experience while providing valuable business intelligence to all stakeholders in the food service industry.
