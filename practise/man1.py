import seaborn as sns
import matplotlib.pyplot as plt
import pandas as pd
data = {
    'commodity': ['Amaranthus', 'Banana - Green', 'Bhindi(Ladies Finger)', 'Bitter gourd', 'Black pepper'],
    'min_price': [6000, 4500, 6000, 6000, 110000],
    'max_price': [8000, 5500, 8000, 8000, 130000],
    'modal_price': [7000, 5000, 7000, 7000, 120000]
}
df = pd.DataFrame(data)
sns.set(style="whitegrid")
plt.figure(figsize=(10, 6))
sns.barplot(x='commodity', y='modal_price', data=df, palette='Set2')
plt.title('Modal Price of Commodities')
plt.xlabel('Commodity')
plt.ylabel('Modal Price')
plt.xticks(rotation=45, ha='right')
plt.show()