# from pendulum import DateTime, duration
# import pandas as pd
# import numpy as np
# from random import randint
# from sklearn.model_selection import train_test_split
# import os
# from datetime import datetime


# def save_dates_to_csv(dates, file_path='selected_dates.csv'):
#     """
#     Save the dates to CSV, ensuring no duplicates.
#     Marks 'Starts' for odd indices and 'Ends' for even indices.
#     """
#     # Initialize the CSV header and list for rows
#     csv_header = "Month,Day,Year,Duration\n"
#     csv_rows = []
    
#     # Set to track seen dates (as a tuple of Month-Day-Year)
#     seen_dates = set()

#     for idx, date in enumerate(dates):
#         # Create a string to represent the date (Month-Day-Year)
#         date_str = f"{date.month}-{date.day}-{date.year}"

#         # Check if the date is already in the set
#         if date_str not in seen_dates:
#             duration = 'Starts' if idx % 2 == 0 else 'Ends'
#             csv_rows.append(f"{date.month},{date.day},{date.year},{duration}")
#             seen_dates.add(date_str)  # Mark this date as added

#     # Ensure the directory exists
#     dir_path = os.path.dirname(file_path)
#     if not os.path.exists(dir_path):
#         os.makedirs(dir_path)

#     # Write to the CSV file
#     with open(file_path, 'w', newline='') as file:
#         file.write(csv_header)  # Write the header
#         for row in csv_rows:
#             file.write(row + "\n")  # Write each row

#     print(f"CSV file saved at: {file_path}")



# def generate_synthetic_data(duration_cycle, start_day, year, start_month_index=1, number_of_cycle=5, period_duration=30, cycle_interval=[5, 6], period_interval=[26, 30]):
#     """
#     function that generate the synthetic data
#     """
#     data_frame = pd.DataFrame(columns=['M', 'Day', 'Year', 'Duration'])

#     start_time = DateTime(year, start_month_index, start_day, 1, 0, 0)
#     end_time = start_time + duration(days=duration_cycle)

#     for _ in range(0, number_of_cycle + 1):
#         data_frame = pd.concat([data_frame, pd.DataFrame(np.array([[start_time.month, start_time.day, start_time.year, 'Starts']]),
#                                                          columns=['M', 'Day', 'Year', 'Duration'])], ignore_index=True, axis=0)

#         data_frame = pd.concat([data_frame, pd.DataFrame(np.array([[end_time.month, end_time.day, end_time.year, 'Ends']]),
#                                                          columns=['M', 'Day', 'Year', 'Duration'])], ignore_index=True, axis=0)

#         duration_cycle = randint(cycle_interval[0], cycle_interval[1])
#         period_duration = randint(period_interval[0], period_interval[1])

#         start_time = start_time + duration(days=period_duration)
#         end_time = start_time + duration(days=duration_cycle)

#     return data_frame


# def save_dates_to_csv(dates, file_path='selected_dates.csv'):
#     """
#     Save the dates to CSV in the same format as Calendar.tsx
#     """
#     csv_header = "Month,Day,Year,Duration\n"
#     csv_rows = []
#     for idx, date in enumerate(dates):
#         duration = 'Starts' if idx % 2 == 0 else 'Ends'
#         csv_rows.append(f"{date.month},{date.day},{date.year},{duration}")

#     # Ensure directory exists
#     dir_path = os.path.dirname(file_path)
#     if not os.path.exists(dir_path):
#         os.makedirs(dir_path)

#     # Write or append to CSV file
#     with open(file_path, 'a' if os.path.exists(file_path) else 'w', newline='') as file:
#         file.write(csv_header + "\n" + "\n".join(csv_rows) + "\n")

#     print(f"CSV file saved at: {file_path}")


# def calculate_period_length(dates, dates_numbers):
#     """
#     Calculate the length of the period
#     """
#     period_length = []
#     for index in range(0, dates_numbers, 2):
#         period_length.append((dates[index + 1] - dates[index]).days)

#     return period_length


# def calculate_cycle_length(dates, dates_numbers):
#     """
#     Calculate the length of the cycle
#     """
#     cycle_length = []
#     for index in range(0, dates_numbers - 2, 2):
#         cycle_length.append((dates[index + 2] - dates[index]).days)

#     return cycle_length


# def calculate_datatime(dataset):
#     """
#     Calculate the datetime of the dates
#     """
#     dates_format = pd.to_datetime(dict(year=dataset.Year, month=dataset.M, day=dataset.Day))
#     period_length = calculate_period_length(dates_format, len(dataset))
#     cycle = calculate_cycle_length(dates_format, len(dataset))

#     formatted_dataset = []
#     index = 0
#     for date_index in range(0, len(dates_format) - 2, 2):
#         formatted_dataset.append([dates_format[date_index].date(), cycle[index], period_length[index]])
#         index += 1

#     return formatted_dataset

# def prepared_the_features(dataset_with_datatime):
#     """
#     Prepare features and labels for the model
#     """
#     # Assume dataset_with_datatime is a list of [date, cycle_length, period_length]
#     # Extract features (cycle_length, period_length) and labels (the next cycle and period)
    
#     features = []
#     labels = []

#     for i in range(1, len(dataset_with_datatime)):
#         feature = dataset_with_datatime[i-1][1:]  # Take cycle_length and period_length from the previous day
#         label = dataset_with_datatime[i][1:]     # Take the next cycle_length and period_length as labels

#         features.append(feature)
#         labels.append(label)

#     return np.array(features), np.array(labels)


# def generate_final_features(dataset):
#     """
#     Generate the final dataset
#     """
#     dataset_with_datatime = calculate_datatime(dataset)
#     return prepared_the_features(dataset_with_datatime)


from pendulum import DateTime
from pendulum import duration
import pandas as pd
import numpy as np
from random import randint
from sklearn.model_selection import train_test_split

def generate_synthetic_data(duration_cycle, start_day, year, start_month_index=1, number_of_cycle=5, period_duration=30, cycle_interval=[5, 6], period_interval=[26, 30]):
    """
    function that generate the synthetic data

        Args:
            duration_cycle (int): duration of the cycle in days
            start_day (int): day of the first cycle
            year (int): year of the first cycle
            start_month_index (int): month of the first cycle
            number_of_cycle (int): number of cycles
            period_duration (int): duration of the period between cycles in days
            cycle_interval (list): interval of the duration of the cycle in days
            period_interval (list): interval of the duration of the period between cycles in days

        Return:
            df (pd.DataFrame): dataframe with the synthetic data
        """
    data_frame = pd.DataFrame(columns=['M', 'Day', 'Year', 'Duration'])

    start_time = DateTime(year, start_month_index, start_day, 1, 0, 0)
    end_time = start_time+duration(days=duration_cycle)

    for _ in range(0, number_of_cycle+1):

            data_frame = pd.concat([data_frame, pd.DataFrame(np.array([[start_time.month, start_time.day, start_time.year, 'Starts']]),
                                                             columns=['M', 'Day', 'Year', 'Duration'])],  ignore_index=True, axis=0)

            data_frame = pd.concat([data_frame, pd.DataFrame(np.array([[end_time.month, end_time.day, end_time.year, 'Ends']]),
                                                             columns=['M', 'Day', 'Year', 'Duration'])],  ignore_index=True, axis=0)

            #TODO(Cibely): Make the durantion_cycle and period_duration be random values
            duration_cycle = randint(cycle_interval[0], cycle_interval[1])
            period_duration = randint(period_interval[0], period_interval[1])
            
            start_time = start_time+duration(days=period_duration)
            end_time = start_time+duration(days=duration_cycle)

    return data_frame


def calculate_period_length(dates, dates_numbers):
    """
    function that calculate the length of the period

    Args:
        dates (list): list of dates
        dates_numbers (int): number of dates

    Returns:
        period_length (list): list of length of the period in days
    """
    period_length = []
    for index in range(0,dates_numbers,2):
        period_length.append((dates[index+1] - dates[index]).days)

    return period_length


def calculate_cycle_length(dates, dates_numbers):
    """
    function that calculate the length of the cycle

    Args:
        dates (list): list of dates
        dates_numbers (int): number of dates

    Returns:
        cycle_length (list): list of length of the cycle in days
    """
    cycle_length = []
    for index in range(0,dates_numbers-2,2):
        cycle_length.append((dates[index+2] - dates[index]).days)

    return cycle_length


def calculate_datatime(dataset):
    """
    function that calculate the datetime of the dates

    Args:
        dataset (pd.DataFrame): dataframe with the data

    Returns:
        formatted_dataset (list): list with the features
    """

    dates_format=pd.to_datetime(dict(year=dataset.Year, month=dataset.M, day=dataset.Day))
    period_length=calculate_period_length(dates_format, len(dataset))
    cycle=calculate_cycle_length(dates_format, len(dataset))

    formatted_dataset=[]
    index=0
    for date_index in range(0,len(dates_format)-2,2):
        formatted_dataset.append([dates_format[date_index].date(), cycle[index], period_length[index]])
        index+=1

    return formatted_dataset


def prepared_the_features(periods):
    """
    function that prepare the features for the prediction


    Args:
        periods (list): list of the periods

    Returns:
        features (np.array): array with the features
        labels (np.array): array with the labels
    """

    features = []
    labels = []
    for period in periods[:-3]:
        p_index = periods.index(period)
        features.append([])
        features[-1].append([period[-2], period[-1]])
        features[-1].append([periods[p_index + 1][-2], periods[p_index + 1][-1]])
        features[-1].append([periods[p_index + 2][-2], periods[p_index + 2][-1]])
        labels.append([periods[p_index + 3][-2], periods[p_index + 3][-1]])
    #TODO(Cibely): verify that len(features) == len(labels) must be true

    return features, labels


def generate_final_features(dataset): 
    """
    function that generate the final dataset

    Args:
        dataset (pd.DataFrame): dataframe with the data

    Returns:
        final_dataset (list): list with the final dataset
    """
   
    dataset_with_datatime = calculate_datatime(dataset)

    return prepared_the_features(dataset_with_datatime)

def split_dataset(features, labels, test_size=0.2, random_state=0, reshape=True): 
    """
    function that split the dataset

    Args:
        features (np.array): array with the features
        labels (np.array): array with the labels
        test_size (float): percentage of the test size
        random_state (int): random state

    Returns:
        train_features (np.array): array with the train features
        test_features (np.array): array with the test features
        train_labels (np.array): array with the train labels
        test_labels (np.array): array with the test labels
    """

    
    train_features, test_features, train_labels, test_labels = train_test_split(features, labels, test_size=test_size, random_state=random_state)
    train_features = np.array(train_features)
    test_features = np.array(test_features)
    train_labels = np.array(train_labels)
    test_labels = np.array(test_labels)
    if reshape:
        train_features = train_features.reshape(train_features.shape[0], train_features.shape[1]*train_features.shape[2])
        test_features = test_features.reshape(test_features.shape[0], test_features.shape[1]*test_features.shape[2])
        train_labels = train_labels.reshape(train_labels.shape[0], train_labels.shape[1]*1)
        test_labels = test_labels.reshape(test_labels.shape[0], test_labels.shape[1]*1)

    return train_features, test_features, train_labels, test_labels

def create_dataset(dataset, look_back=1):
    """ 
        This function is used to create dataset for LSTM model
        Args:
            dataset: The dataset
            look_back: The number of previous time steps to use as input variables to predict the next time period
        Returns:
            dataX: The input data
            dataY: The output data
    """
    dataX, dataY = [], []
    for i in range(len(dataset)-look_back-1):
        a = dataset[i:(i+look_back), 0]
        dataX.append(a)
        dataY.append(dataset[i + look_back, 0])
    return np.array(dataX), np.array(dataY)


def convet2dataframe(data, columns):
    """
    function that convert the data to dataframe

    Args:
        data (np.array): array with the data
        columns (list): list with the columns

    Returns:

    """
    data = data.reshape(1,-1,2)
    data_frame = pd.DataFrame(data[0], columns=columns)
    data_frame['time'] = data_frame.index
    return data_frame