import pandas as pd
from sklearn.ensemble import IsolationForest

def run_model(file_path):

    df = pd.read_excel(file_path, header=None)

    # Fix headers
    df.columns = df.iloc[2].fillna('') + " " + df.iloc[3].fillna('')
    df = df[4:].reset_index(drop=True)

    # Clean column names
    df.columns = df.columns.str.replace('-', '')
    df.columns = df.columns.str.replace(r'[^a-zA-Z0-9 ]', '', regex=True)
    df.columns = df.columns.str.replace(r'\d+', '', regex=True)
    df.columns = df.columns.str.strip()

    # Melt (convert wide → long)
    id_cols = df.columns[:7]
    df_melted = df.melt(id_vars=id_cols, var_name='Month', value_name='Consumption')

    # Clean values
    df_melted['Consumption'] = pd.to_numeric(df_melted['Consumption'], errors='coerce')
    df_melted = df_melted.dropna()

    # Convert month to number
    month_map = {
        'January':1, 'February':2, 'March':3, 'April':4,
        'May':5, 'June':6, 'July':7, 'August':8,
        'September':9, 'October':10, 'November':11, 'December':12
    }

    df_melted['Month_num'] = df_melted['Month'].map(month_map)

    # Apply model
    model = IsolationForest(contamination=0.05)
    model.fit(df_melted[['Consumption', 'Month_num']])

    df_melted['anomaly'] = model.predict(df_melted[['Consumption', 'Month_num']])

    # Return only anomalies
    anomalies = df_melted[df_melted['anomaly'] == -1]

    return anomalies.to_dict(orient="records")
