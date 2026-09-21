REGION_KEYWORDS: dict[str, tuple[str, ...]] = {
    "Andhra Pradesh": ("andhra pradesh", "visakhapatnam", "vijayawada", "tirupati", "guntur"),
    "Assam": ("assam", "guwahati", "dibrugarh", "silchar"),
    "Bihar": ("bihar", "patna", "gaya", "muzaffarpur"),
    "Chhattisgarh": ("chhattisgarh", "raipur", "bilaspur"),
    "Delhi": ("delhi", "new delhi", "ncr"),
    "Goa": ("goa", "panaji", "margao"),
    "Gujarat": ("gujarat", "ahmedabad", "surat", "vadodara", "gandhinagar"),
    "Haryana": ("haryana", "gurugram", "faridabad", "panipat"),
    "Himachal Pradesh": ("himachal pradesh", "shimla", "manali", "dharamshala"),
    "Jharkhand": ("jharkhand", "ranchi", "jamshedpur", "dhanbad"),
    "Karnataka": ("karnataka", "bengaluru", "bangalore", "mysuru", "mangalore", "mangaluru", "hubballi"),
    "Kerala": ("kerala", "kochi", "thiruvananthapuram", "kozhikode", "thrissur"),
    "Madhya Pradesh": ("madhya pradesh", "bhopal", "indore", "jabalpur"),
    "Maharashtra": ("maharashtra", "mumbai", "pune", "nagpur", "nashik"),
    "Odisha": ("odisha", "bhubaneswar", "cuttack", "puri"),
    "Punjab": ("punjab", "amritsar", "ludhiana", "chandigarh"),
    "Rajasthan": ("rajasthan", "jaipur", "jodhpur", "udaipur", "kota"),
    "Tamil Nadu": ("tamil nadu", "chennai", "coimbatore", "madurai", "salem", "tiruchirappalli", "tirunelveli"),
    "Telangana": ("telangana", "hyderabad", "warangal", "nizamabad"),
    "Uttar Pradesh": ("uttar pradesh", "lucknow", "kanpur", "agra", "varanasi", "noida"),
    "Uttarakhand": ("uttarakhand", "dehradun", "haridwar", "nainital"),
    "West Bengal": ("west bengal", "kolkata", "howrah", "siliguri"),
}

SUPPORTED_REGIONS = ("India", *REGION_KEYWORDS.keys())
INDIA_KEYWORDS = ("india", "indian", "new delhi", "bharat")


def canonical_region(value: str) -> str | None:
    """Return a supported region while accepting case-insensitive query values."""
    return next((region for region in SUPPORTED_REGIONS if region.casefold() == value.strip().casefold()), None)


def classify_region(text: str, default_region: str | None = None) -> str | None:
    """Deterministic keyword matching; the first configured regional match wins."""
    haystack = text.casefold()
    for region, keywords in REGION_KEYWORDS.items():
        if any(keyword in haystack for keyword in keywords):
            return region
    if any(keyword in haystack for keyword in INDIA_KEYWORDS):
        return "India"
    return canonical_region(default_region or "")
