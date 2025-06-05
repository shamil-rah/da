import os
import tkinter as tk
from tkinter import filedialog

def choose_folder():
    root = tk.Tk()
    root.withdraw()  # Hide the root window
    folder_selected = filedialog.askdirectory(title="Select a Folder")
    return folder_selected

def print_tree(startpath, indent=""):
    for item in sorted(os.listdir(startpath)):
        path = os.path.join(startpath, item)
        if os.path.isdir(path):
            print(f"{indent}📁 {item}")
            print_tree(path, indent + "    ")
        else:
            print(f"{indent}📄 {item}")

if __name__ == "__main__":
    folder = choose_folder()
    if folder:
        print(f"\nFolder Tree for: {folder}\n")
        print_tree(folder)
    else:
        print("No folder selected.")
